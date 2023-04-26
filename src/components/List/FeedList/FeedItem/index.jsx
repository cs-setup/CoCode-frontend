import React, { useState, useEffect } from "react";
import formatTime from "../../../../utils/formatTime";
import {
  List,
  Space,
  Avatar,
  Row,
  Col,
  Divider,
  Card,
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
import { Link } from "react-router-dom";
import { like } from "../../../../utils/api/feed";
import useLogin from "../../../../hooks/useLogin";
import { deleteFeed } from "../../../../utils/api/feed";
import CommentList from "../../CommentList";

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

const FeedItem = ({ item, userInfo, reGetList }) => {
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [showComment, setShowComment] = useState(false);
  const [fetchState, setFetchState] = useState(true);
  const isLogin = useLogin();

  if (!userInfo.user) {
    userInfo = { user: { id: "" } };
  }

  const changeLike = async (params) => {
    if (!isLogin) {
      return message.warning("用户未登录");
    }
    isLiked ? item.likedCount-- : item.likedCount++;
    setIsLiked(!isLiked);

    const result = await like(params);
    if (!result) {
      setFetchState(false);
    }
  };

  // 处理点赞请求失败
  useEffect(() => {
    if (!fetchState) {
      message.error("error");
      isLiked ? item.likedCount-- : item.likedCount++;
      setIsLiked(!isLiked);
      setFetchState(true);
    }
  }, [fetchState]);

  const showCommentList = () => {
    setShowComment(!showComment);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteFeed({ id: item.id });
      if (result === true) {
        reGetList();
        message.success("删除成功");
      }
    } catch (e) {
      message.error("删除失败");
    }
  };

  return (
    <List.Item key={item.id}>
      <Card bordered={false} size="small">
        <List.Item.Meta
          avatar={
            <Link to={`/user/${item.user.id}`} target="_blank">
              <Avatar src={item.user.avatar} />
            </Link>
          }
          title={
            <Row justify="space-between">
              <Col>
                <Link
                  to={`/user/${item.user.id}`}
                  target="_blank"
                  style={{ fontSize: 20 }}
                >
                  {item.user.nickname}
                </Link>
              </Col>
              {userInfo.user.id === item.user.id && (
                <Col>
                  <Tooltip
                    title={
                      <Popconfirm
                        placement="leftTop"
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
                        <a>删除</a>
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
          description={formatTime(item.createTime)}
        />
        <Row justify="center">
          <Col span={24} offset={4}>
            {item.content}
          </Col>
          <Divider style={{ marginBottom: 8, width: "100%" }}></Divider>
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
              <Col span={24}>
                <CommentList parentItem={item} />
              </Col>
            </>
          )}
        </Row>
      </Card>
    </List.Item>
  );
};

export default FeedItem;
