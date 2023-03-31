import React, { useState, useContext, useEffect } from "react";
import { Input, Button, Space, Row, Col, message } from "antd";
import { HomeContext } from "../../contexts/HomeContext";

import { publish } from "../../utils/api/feed";

const { TextArea } = Input;

const FeedEdit = () => {
  const { setPublishItem } = useContext(HomeContext);
  const [textAreaValue, setTextAreaValue] = useState("");

  const submitFeed = async () => {
    let result;

    if (textAreaValue.trim() !== "") {
      result = await publish({
        content: textAreaValue,
      });
    } else {
      message.warning("内容不能为空");
    }

    if (result.post) {
      setTextAreaValue("");
      setPublishItem(result.post);
      message.success("发布成功");
    }
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <TextArea
          autoSize={{ minRows: 4, maxRows: 4 }}
          rows={6}
          placeholder="说点什么吧..."
          maxLength={200}
          showCount
          allowClear
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
        />
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={submitFeed}>
              发布
            </Button>
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default FeedEdit;
