import React, { useState } from "react";
import formatTime from "../../../../utils/formatTime";
import {
  List,
  Space,
  Avatar,
  Row,
  Col,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import {
  LikeOutlined,
  LikeTwoTone,
  MessageOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { like, deleteComment } from "../../../../utils/api/feed";
import CommentList from "../../CommentList";

const IconText = ({ icon, text, callback, id }) => (
  <Space>
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (icon !== MessageOutlined) {
          callback({ objectType: "post", objectId: id.toString() });
        } else {
          callback();
        }
      }}
    >
      {React.createElement(icon)}
    </div>
    <div>{text}</div>
  </Space>
);

const CommentItem = ({ item, getCommentList, userInfo }) => {
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [showComment, setShowComment] = useState(false);

  if (!userInfo.user) {
    userInfo = { user: { id: "" } };
  }

  const changeLike = async (params) => {
    const result = await like(params);
    if (result === true) {
      isLiked ? item.likedCount-- : item.likedCount++;
      setIsLiked(!isLiked);
    }
  };

  const showCommentList = () => {
    setShowComment(!showComment);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteComment({ id: item.id });
      if (result === true) {
        message.success("删除成功");
        getCommentList();
      }
    } catch (e) {
      message.error("删除失败");
    }
  };

  return (
    <List.Item
      key={item.id}
      style={{ backgroundColor: "#F0F2F5", borderRadius: "16px", padding: 16 }}
    >
      <List.Item.Meta
        avatar={<Avatar size="middle" src={item.user.avatar} />}
        title={
          <Row justify="space-between">
            <Col>
              <a href={item.href} style={{ fontSize: 16, color: "#000" }}>
                {item.user.nickname}
              </a>
            </Col>
            {userInfo.user.id === item.user.id && (
              <Col>
                <Tooltip
                  title={
                    <Popconfirm
                      placement="left"
                      title="确定要删除吗？"
                      onConfirm={handleDelete}
                      okText="确定"
                      okType="danger"
                      showCancel={false}
                      icon={
                        <QuestionCircleOutlined
                          style={{
                            color: "red",
                          }}
                        />
                      }
                    >
                      <a style={{ color: "#000" }}>删除</a>
                    </Popconfirm>
                  }
                  placement="bottom"
                  trigger="click"
                  color="#fff"
                >
                  <MoreOutlined />
                </Tooltip>
              </Col>
            )}
          </Row>
        }
        style={{ margin: 0 }}
      />
      <Row justify="center" gutter={[0, 8]}>
        <Col span={24} offset={4}>
          {item.content}
        </Col>
        <Col span={24} offset={4}>
          <Row justify="space-between">
            <Col span={8}>
              <Space>
                <IconText
                  icon={isLiked ? LikeTwoTone : LikeOutlined}
                  text={item.likedCount || "0"}
                  id={item.id}
                  callback={changeLike}
                />
                {item.parentId == "0" && (
                  <IconText
                    icon={MessageOutlined}
                    text={
                      item.childComments ? item.childComments.length : false
                    }
                    key="list-vertical-message"
                    callback={showCommentList}
                  />
                )}
              </Space>
            </Col>
            <Col span={8}>
              <div style={{ fontSize: 14, padding: 0 }}>
                {formatTime(item.createTime)}
              </div>
            </Col>
          </Row>
        </Col>
        {showComment && (
          <>
            <Col span={20}>
              <CommentList parentItem={item} />
            </Col>
          </>
        )}
      </Row>
    </List.Item>
  );
};

export default CommentItem;
