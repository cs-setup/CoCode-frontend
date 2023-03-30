import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { LoginProvider } from "./contexts/LoginContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
            colorPrimary: '#13c2c2',
          },
        }}
      >
        <LoginProvider>
          <App />
        </LoginProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
