import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import "./styles.css";

export default function Dashboard() {
  const [modules, setModules] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/api/modules", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setModules(response.data);
      });
  }, [token]);

  return (
    <div className="container">
      <div>
        <ul>
          {modules.map((module) => (
            <li key={module.url}>
              <Link className="button" to={module.url} url={module.url}>
                {module.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
