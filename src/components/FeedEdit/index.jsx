import React, { useState, useContext } from "react";
import { Input, Button, Space, Row, Col, message } from "antd";
import { HomeContext } from "../../contexts/HomeContext";
import { publish } from "../../utils/api/feed";

const { TextArea } = Input;

const FeedEdit = () => {
  const { setPublishItem } = useContext(HomeContext);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false)
  const [textAreaValue, setTextAreaValue] = useState("");

  const submitFeed = async () => {
    setLoading(true)
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
    setLoading(false)
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <TextArea
          autoSize={{ minRows: 3, maxRows: 3 }}
          rows={6}
          placeholder="说点什么吧..."
          maxLength={200}
          showCount
          allowClear
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          onFocus={() => {
            setShowEdit(true);
          }}
          onBlur={() => {
            if (textAreaValue.trim() === "") {
              setShowEdit(false);
            }
          }}
        />
        {showEdit && (
          <Row justify="end">
            <Col>
              <Button
                type="primary"
                onClick={(event) => {
                  event.stopPropagation();
                  submitFeed();
                }}
                loading={loading}
              >
                发布
              </Button>
            </Col>
          </Row>
        )}
      </Space>
    </>
  );
};

export default FeedEdit;
