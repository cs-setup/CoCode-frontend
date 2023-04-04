import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { LoginProvider } from "./contexts/LoginContext";
import { UserProvider } from "./contexts/UserContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
            colorPrimary: "#13c2c2",
          },
        }}
      >
        <LoginProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </LoginProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
