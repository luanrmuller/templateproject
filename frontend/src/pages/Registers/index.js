import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import "./styles.css";

export default function Registers(props) {
  return (
    <div className="container">
      <h1 className="login">Cadastros</h1>

      <Link className="button" to="/products">
        Produtos
      </Link>
      <Link className="button" to="/emails">
        Emails
      </Link>
    </div>
  );
}
