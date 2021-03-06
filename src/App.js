import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import logo from "./logo.png";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppBar from "./components/appBar";
import AppBody from "./components/appBody";
import SecurePaymentPage from "./scenes/securePaymentPage/";
import ThankYouPage from "./scenes/thankYouPage/";
import ProgressBar from "./components/progressBar";

class App extends Component {
  render() {
    const {isProgressBarShow,ProgressTitle} = this.props.UiStore;
    return (
      <Router>
        <div className="App">
          <AppBar
            title="LivePerson"
            logo={<img src={logo} alt="LivePerson Logo" />}
          />
          <ProgressBar title={ProgressTitle} open={isProgressBarShow} />
          <AppBody>
            <Route exact path="/" component={SecurePaymentPage} />
            <Route path="/thank-you" component={ThankYouPage} />
          </AppBody>
        </div>
      </Router>
    );
  }
}

export default inject("UiStore")(observer(App));
