import React, { useState, useEffect } from "react";

export const WebSocketContext = React.createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;

    const newSocket = new WebSocket("ws://119.23.244.10/group/ws");
    newSocket.onopen = () => {
      console.log("WebSocket 连接建立成功！");
      newSocket.send(
        JSON.stringify({ seq: Date.now(), operate: "login", data: token })
      );
      console.log(Date.now());
      const interval = setInterval(() => {
        console.log("ping");
        newSocket.send("ping");
      }, 50000);
      newSocket.onclose = () => {
        console.log("WebSocket 连接已关闭！");
        clearInterval(interval);
      };
    };

    newSocket.onmessage = (event) => {
      console.log(event);
    };

    newSocket.onerror = (event) => {
      console.error("WebSocket 连接出错：", event);
    };

    setWebSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};
