import React from "react";
import ReactDom from "react-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {Provider} from "react-redux"

import store from "./redux/store";
import Login from "./containers/login";
import Register from "./containers/register"
import Main from "./containers/main"


ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route component={Main} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
