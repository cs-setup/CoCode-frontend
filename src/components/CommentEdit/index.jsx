import React, { useState, useContext } from "react";
import { Input, Button, Avatar, Row, Col, Space } from "antd";
import { UserContext } from "../../contexts/UserContext";
import { comment } from "../../utils/api/feed";
import { message } from "antd";

const { TextArea } = Input;

const CommentEdit = ({ parentItem, getCommentList }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const { userInfo } = useContext(UserContext);

  if (!userInfo.user || !userInfo.user.avatar) {
    return null;
  }

  const submitComment = async () => {
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
    } else {
      message.warning("内容不能为空");
    }
    if (result === true) {
      getCommentList();
      setTextAreaValue("");
      message.success("评论成功");
    }
  };

  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }} size="small">
        <Row justify="space-between">
          <Col span={4} lg={2}>
            <Avatar src={userInfo.user.avatar} />
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
