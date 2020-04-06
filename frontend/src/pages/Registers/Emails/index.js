import React, { useState, useEffect } from "react";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import { MemoryRouter, Route } from "react-router";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Checkbox from "@material-ui/core/Checkbox";

import api from "../../../services/api";
import "./styles.css";

import EmailModal from "./emailModal";

export default function Emails() {
  const [emails, setEmails] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const pageSize = 4;

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadEmails(page);
  }, [token, page]);

  async function loadEmails(page) {
    console.log(`buscando emails da pagina -> ${page}`);
    if (loading) {
      return;
    }

    if (total > 0 && emails.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get("/api/emails", {
      params: {
        fields: "email isActive isDefault",
        filters: [],
        sort: "email",
        page,
        pageSize,
      },
      headers: {
        Authorization: token,
      },
    });

    console.table(response.data);
    // setEmails([...emails, ...response.data]);
    setEmails(response.data);

    setTotal(response.headers["x-total-count"]);
    setTotalPages(
      Math.round((response.headers["x-total-count"] / pageSize) * 1) / 1
    );

    setPage(page);
    setLoading(false);
  }

  async function handleDeleteEmail(id) {
    try {
      await api.delete(`/api/emails/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      setEmails(emails.filter((email) => email._id !== id));
    } catch (error) {
      alert("Erro ao deletar o email, tente novamente.");
    }
  }

  return (
    <div>
      <div className="container">
        <header>
          <span className="">E-mails {total}</span>
        </header>

        <h1>E-mails cadastrados</h1>

        <EmailModal />

        <ul>
          {emails.map((email) => (
            <li key={email._id}>
              <FormControl component="fieldset">
                <FormGroup aria-label="position">
                  <strong>Email:</strong>
                  <p>{email.email}</p>

                  {/* <strong>Ativo:</strong>
              <p>{email.isActive}</p>

              <strong>Padrão:</strong>
              <p>{email.isDefault}</p> */}

                  <FormControlLabel
                    value="Ativo"
                    control={
                      <Checkbox color="primary" value={email.isActive} />
                    }
                    label="Ativo"
                    // labelPlacement="Ativo"
                  />
                  <FormControlLabel
                    value="Padrão"
                    control={
                      <Checkbox color="primary" value={email.isDefault} />
                    }
                    label="Padrão"
                    // labelPlacement="Padrão"
                  />
                </FormGroup>
              </FormControl>
              <EmailModal email={email} />

              <button
                className="delete"
                onClick={() => handleDeleteEmail(email._id)}
                type="button"
              >
                <DeleteOutlinedIcon /* color="#E64A19" */ />
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
                renderItem={(item) => (
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
