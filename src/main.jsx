import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { UserProvider } from "./contexts/UserContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";
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
        <UserProvider>
          <WebSocketProvider>
            <App />
          </WebSocketProvider>
        </UserProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
