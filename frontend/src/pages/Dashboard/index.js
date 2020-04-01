import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import "./styles.css";

export default function Dashboard() {
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/api/dashboard", {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        console.log(response.data);
        setMsg(response.data.msg);
      });
  }, [token]);

  return (
    <div className="container">
      <h1 className="msg">{msg}</h1>

      <Link className="button" to="/products">
        Produtos
      </Link>
    </div>
  );
}
