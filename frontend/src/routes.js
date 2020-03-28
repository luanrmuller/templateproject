import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={SignIn} />
        <Route path="/signUp" exact component={SignUp} />
        <Route path="/404" exact component={PageNotFound} />
        <Route path="/dashboard" exact component={Dashboard} /> */}
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
