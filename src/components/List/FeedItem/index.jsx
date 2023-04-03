import React, { useState } from "react";
import dayjs from "dayjs";
import { List, Space, Avatar, Row, Col, Divider, Card } from "antd";
import { LikeOutlined, LikeTwoTone, MessageOutlined } from "@ant-design/icons";
import { like } from "../../../utils/api/feed";
import CommentList from "../CommentList";

const IconText = ({ icon, text, callback, id }) => (
  <Row justify="center">
    <Col span={4}>
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
    </Col>
  </Row>
);

const FeedItem = ({ item }) => {
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
      <Card size="small">
        <List.Item.Meta
          avatar={<Avatar src={item.author.avatar} />}
          title={<a href={item.href}>{item.author.nickname}</a>}
          description={dayjs(item.createTime).format("YYYY-MM-DD HH:mm")}
        />
        <Row justify="center">
          <Col span={24} offset={4}>
            {item.content}
          </Col>
          <Divider style={{ marginBottom: 5, width: "100%" }}></Divider>
          <Col span={24}>
            <Row align>
              <Col span={12}>
                <IconText
                  icon={isLiked ? LikeTwoTone : LikeOutlined}
                  text={item.likedCount}
                  id={item.id}
                  callback={changeLike}
                />
              </Col>
              <Col span={12}>
                <IconText
                  icon={MessageOutlined}
                  text={item.commentCount}
                  key="list-vertical-message"
                  callback={showCommentList}
                />
              </Col>
            </Row>
          </Col>
          {showComment && (
            <>
              <Divider
                style={{ width: "100%", marginTop: 8, marginBottom: 16 }}
              ></Divider>
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

export default FeedItem;
