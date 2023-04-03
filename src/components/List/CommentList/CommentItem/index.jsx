import React, { useState } from "react";
import dayjs from "dayjs";
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
    <List.Item key={item.id}>
      <Card bordered={false} type="inner" size="small">
        <List.Item.Meta
          avatar={<Avatar size="small" src={item.user.avatar} />}
          title={
            <a href={item.href} style={{ fontSize: 16, margin: 0 }}>
              {item.user.nickname}
            </a>
          }
          description={
            <div style={{ fontSize: 14, padding: 0 }}>
              {dayjs(item.createTime).format("YYYY-MM-DD HH:mm")}
            </div>
          }
          style={{ margin: 0 }}
        />
        <Row justify="center" gutter={[0, 8]}>
          <Col span={24} offset={4}>
            {item.content}
          </Col>
          <Col span={24} offset={4}>
            <Space>
              <IconText
                icon={isLiked ? LikeTwoTone : LikeOutlined}
                text={item.likedCount}
                id={item.id}
                callback={changeLike}
              />

              <IconText
                icon={MessageOutlined}
                text={item.commentCount}
                key="list-vertical-message"
                callback={showCommentList}
              />
            </Space>
          </Col>
          {showComment && (
            <>
              <Col span={20}>
                <CommentList id={item.id} />
              </Col>
            </>
          )}
        </Row>
      </Card>
    </List.Item>
  );
};

export default CommentItem;
