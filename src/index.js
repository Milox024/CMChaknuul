import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { Provider } from 'react-redux';
import { store } from './React/ReduxSaga/index';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);