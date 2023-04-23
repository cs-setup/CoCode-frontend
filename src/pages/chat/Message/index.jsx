import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Select } from "antd";
import useUserInfo from "../../../hooks/useUserInfo";
import useWebSocket from "../../../hooks/useWebSocket";
import "./style.css";

const Message = () => {
  const [messageList, setMessageList] = useState([]);
  const [toId, setToId] = useState("");
  const [isGroup, setIsGroup] = useState(true);
  const [content, setContent] = useState("");
  const socket = useWebSocket();

  const sendMessage = () => {
    const data = { toId, isGroup, content };
    socket.send(JSON.stringify({ seq: Date.now(), operate: "message", data }));
  };

  const handleChange = (value) => {
    setIsGroup(value);
  };

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.code === 200) {
        if (data.msg === "message") {
          setMessageList([...messageList,data.data.content]);
        }
      }
    };
  }, [messageList]);

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
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </Form.Item>
        <Button onClick={sendMessage}>发送</Button>
      </Form>
    </>
  );
};

export default Message;
