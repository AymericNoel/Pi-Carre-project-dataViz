import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllUser from "./App";
import Home from "./Home";
import UserInfo from "./UserInfo";
import Login from "./Form";
import general from "./General";
import bitcoin from "./Bitcoin.js";
import ethereum from "./Ethereum";
import fees from "./Fees";

class app extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = "rgba(255, 255, 128, .5)";
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/allUsers" component={AllUser} />
          <Route exact path="/users/:id" component={UserInfo} />
          <Route path="/login" component={Login} />
          <Route exact path="/users/:id/general" component={general} />
          <Route exact path="/users/:id/bitcoin" component={bitcoin} />
          <Route exact path="/users/:id/ethereum" component={ethereum} />
          <Route exact path="/users/:id/fees" component={fees} />
        </div>
      </Router>
    );
  }
}
export default app;
