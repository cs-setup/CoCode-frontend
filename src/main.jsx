import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{token: {
        fontSize: 16,
      }}}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
