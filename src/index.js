import React from "react";
import ReactDOM from "react-dom";
import ContractProvider from './contexts/Contract.js';
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ContractProvider>
      <App />
    </ContractProvider>
  </React.StrictMode>,
  document.getElementById("root")
);