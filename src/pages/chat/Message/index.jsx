import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Select } from "antd";
import useUserInfo from "../../../hooks/useUserInfo";
import "./style.css";

const Message = () => {
  const [messageList, setMessageList] = useState([111, 222, 333]);
  const [toId, setToId] = useState("");
  const [isGroup, setIsGroup] = useState(true);
  const [messageContent, setMessageContent] = useState("");
  const socketRef = useRef(null);

  const sendMessage = () => {
    const data = { toId, isGroup, messageContent };
    socketRef.current.send(
      JSON.stringify({ seq: Date.now(), operate: "message", data })
    );
    console.log(JSON.stringify({ seq: Date.now(), operate: "message", data }));
  };

  const handleChange = (value) => {
    setIsGroup(value);
  };

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;

    const newSocket = new WebSocket("ws://119.23.244.10/group/ws");

    newSocket.onopen = () => {
      console.log("WebSocket 连接建立成功！");
      newSocket.send(
        // JSON.stringify({ seq: Date.now(), operate: "login", data: token })
        { seq: Date.now(), operate: "login", data: token }
        
      );
    };

    newSocket.onmessage = (event) => {
      console.log("接收到服务器发送的数据：", event.data);
      if (event.data.code === 200) {
        if (event.data.operate === "message") {
          setMessageList(...messageList, event.data);
        }
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket 连接已关闭！");
    };

    newSocket.onerror = (event) => {
      console.error("WebSocket 连接出错：", event);
    };

    // ws.send('Hello, server!');
    socketRef.current = newSocket;

    return () => {
      newSocket.close();
    };
  }, []);
  return (
    <>
      <ul id="messages">
        {messageList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Form id="form" action="">
        <Form.Item label="toId">
          <Input
            value={toId}
            onChange={(e) => {
              setToId(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="isGroup">
          <Select
            defaultValue={isGroup}
            options={[
              { label: "true", value: true },
              { label: "false", value: false },
            ]}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="content">
          <Input
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
          />
        </Form.Item>
        <Button onClick={sendMessage}>发送</Button>
      </Form>
    </>
  );
};

export default Message;
