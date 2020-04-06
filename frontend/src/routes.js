import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Registers from "./pages/Registers";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Registers/Products";
import Emails from "./pages/Registers/Emails";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signUp" exact component={SignUp} />

        <Route path="/registers" exact component={Registers} />
        {/*  <Route path="/dashboard" exact component={Dashboard} /> */}
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/products" exact component={Products} />
        <Route path="/emails" exact component={Emails} />
      </Switch>
    </BrowserRouter>
  );
}
