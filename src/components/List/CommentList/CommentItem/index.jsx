import React, { useState } from "react";
import formatTime from "../../../../utils/formatTime";
import { List, Space, Avatar, Row, Col, Divider, Card } from "antd";
import { LikeOutlined, LikeTwoTone, MessageOutlined } from "@ant-design/icons";
import { like } from "../../../../utils/api/feed";
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

const CommentItem = ({ item }) => {
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [showComment, setShowComment] = useState(false);
  console.log(item);

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
              <a href={item.href} style={{ fontSize: 16, margin: 0 }}>
                {item.user.nickname}
              </a>
            </Col>
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
                {item.childComments && (
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
