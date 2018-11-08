import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import { Provider } from "react-redux";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <div>
              <Main />
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
