import React, { useState, useEffect } from "react";
import { FiActivity } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

export default function Dashboard() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/dashboard").then(response => {
      console.log(response.data);
      setMsg(response.data.msg);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="msg">
        {msg}
        <FiActivity size={16} color="#41414d" />
      </h1>
    </div>
  );
}
