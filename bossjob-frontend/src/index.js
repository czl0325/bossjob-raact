import React from "react";
import ReactDom from "react-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Login from "./containers/login";
import Register from "./containers/register"
import Main from "./containers/main"


ReactDom.render(
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route component={Main} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)
