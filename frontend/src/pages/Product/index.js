import React, { useState, useEffect } from "react";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import { MemoryRouter, Route } from "react-router";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import api from "../../services/api";
import "./styles.css";

import ProductModal from "./productModal";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const pageSize = 4;

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadProducts(page);
  }, [token, page]);

  async function loadProducts(page) {
    console.log(`buscando produtos da pagina -> ${page}`);
    if (loading) {
      return;
    }

    if (total > 0 && products.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get("/api/products", {
      params: {
        fields: "name code",
        filters: [],
        sort: "code",
        page,
        pageSize
      },
      headers: {
        Authorization: token
      }
    });

    // setProducts([...products, ...response.data]);
    setProducts(response.data);

    setTotal(response.headers["x-total-count"]);
    setTotalPages(
      Math.round((response.headers["x-total-count"] / pageSize) * 1) / 1
    );

    setPage(page);
    setLoading(false);
  }

  async function handleDeleteProduct(id) {
    try {
      await api.delete(`/api/products/${id}`, {
        headers: {
          Authorization: token
        }
      });

      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      alert("Erro ao deletar o produto, tente novamente.");
    }
  }

  return (
    <div>
      <div className="container">
        <header>
          <span className="">Produtos {total}</span>
        </header>

        <h1>Produtos cadastrados</h1>

        <ProductModal />

        <ul>
          {products.map(product => (
            <li key={product._id}>
              <strong>Código:</strong>
              <p>{product.code}</p>

              <strong>Nome do produto</strong>
              <p>{product.name}</p>
              {/* 
            <strong>VALOR</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </p> */}

              {/* <button
                className="edit"
                onClick={() => handleEditProduct(product)}
                type="button"
              >
                <FiEdit2 size={20} color="#a8a8b3" />
              </button> */}

              <ProductModal product={product} />

              <button
                className="delete"
                onClick={() => handleDeleteProduct(product._id)}
                type="button"
              >
                <DeleteOutlinedIcon color="#E64A19" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <MemoryRouter initialEntries={["/inbox"]} initialIndex={0}>
        <Route>
          {({ location }) => {
            const query = new URLSearchParams(location.search);
            const page = parseInt(query.get("page"), total) || 1;

            return (
              <Pagination
                page={page}
                count={totalPages}
                renderItem={item => (
                  <PaginationItem
                    component={Link}
                    to={`/inbox${item.page === 1 ? "" : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
                onChange={(ev, page) => setPage(page)}
              />
            );
          }}
        </Route>
      </MemoryRouter>
    </div>
  );
}
