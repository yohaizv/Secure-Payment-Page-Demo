import React from "react";
import { Provider } from "mobx-react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import SecuredFormStore from "./stores/SecuredFormStore";

ReactDOM.render(
  <Provider SecuredFormStore={SecuredFormStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
