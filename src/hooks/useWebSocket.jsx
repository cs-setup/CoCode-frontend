import React, {useContext} from "react";
import { WebSocketContext } from "../contexts/WebSocketContext";

const useWebSocket = () => {
  const webSocket = useContext(WebSocketContext);

  if (!webSocket) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }

  return webSocket;
};

export default useWebSocket;
