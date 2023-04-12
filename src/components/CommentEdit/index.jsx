import React, { useState, useRef, useEffect } from "react";
import { Input, Button, Avatar, Row, Col, Space } from "antd";
import { comment } from "../../utils/api/feed";
import { message } from "antd";

const { TextArea } = Input;

const CommentEdit = ({ parentItem, userInfo, addNewComment }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  if (!userInfo.user || !userInfo.user.avatar) {
    return null;
  }

  useEffect(() => {
    inputRef.current.focus();

  }, []);

  const submitComment = async () => {
    setLoading(true);
    let result;
    if (textAreaValue.trim() !== "") {
      if (parentItem.parentId && parentItem.parentId == "0") {
        // 评论对象为评论
        result = await comment({
          objectId: parentItem.objectId,
          objectType: "post",
          content: textAreaValue,
          parentId: parentItem.id,
          toId: parentItem.user.id,
        });
      } else {
        // 评论对象为帖子
        result = await comment({
          objectId: parentItem.id,
          objectType: "post",
          content: textAreaValue,
          parentId: "0",
          toId: "0",
        });
      }
      if (result) {
        addNewComment(result.comment);
        setTextAreaValue("");
        message.success("评论成功");
      } else {
        message.error("评论失败");
      }
    } else {
      message.warning("内容不能为空");
    }

    setLoading(false);
  };

  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }} size="small">
        <Row justify="space-between">
          <Col span={4} lg={2}>
            <Avatar src={userInfo.user.avatar || ""} />
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
              ref={inputRef}
              onFocus={() => {
                setShowEdit(true);
              }}
              onBlur={() => {
                console.log(111);
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
                loading={loading}
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
