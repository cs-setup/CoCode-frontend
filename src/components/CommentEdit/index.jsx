import React, { useState } from "react";
import { Input, Button, Avatar, Row, Col, Space } from "antd";
import { comment } from "../../utils/api/feed";

const { TextArea } = Input;

const CommentEdit = ({ id, getCommentList }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const submitComment = async () => {
    let result;
    if (textAreaValue.trim() !== "") {
      result = await comment({
        objectId: id,
        objectType: "post",
        content: textAreaValue,
        parentId: "0",
        toId: "0",
      });
    } else {
      message.warning("内容不能为空");
    }
    console.log(result);
    if (result === true) {
      getCommentList()
      setTextAreaValue("");
      message.success("评论成功");
    }
  };

  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }} size="small">
        <Row justify="space-between">
          <Col span={4} lg={2}>
            <Avatar />
          </Col>
          <Col span={20} lg={22}>
            <TextArea
              autoSize
              placeholder="说点什么吧..."
              maxLength={100}
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
          </Col>
        </Row>
        {showEdit && (
          <Row justify="end">
            <Col>
              <Button
                type="primary"
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  submitComment();
                }}
                style={{ fontSize: 14 }}
              >
                发表
              </Button>
            </Col>
          </Row>
        )}
      </Space>
    </>
  );
};

export default CommentEdit;
