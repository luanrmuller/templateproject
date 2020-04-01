import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signUp" exact component={SignUp} />

        {/*         
        <Route path="/pageNotFound" exact component={PageNotFound} />
        <Route path="/dashboard" exact component={Dashboard} /> */}
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/products" exact component={Product} />
      </Switch>
    </BrowserRouter>
  );
}
