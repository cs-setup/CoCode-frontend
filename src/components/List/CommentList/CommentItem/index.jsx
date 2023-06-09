import React, { useState, useEffect } from "react";
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
  Typography,
} from "antd";
import {
  LikeOutlined,
  LikeTwoTone,
  MessageOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import useLogin from "../../../../hooks/useLogin";
import { like, deleteComment } from "../../../../utils/api/feed";
import CommentList from "../../CommentList";

const IconText = ({ icon, text, callback, id }) => (
  <Space>
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (icon !== MessageOutlined) {
          callback({ objectType: "comment", objectId: id });
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

const CommentItem = ({ item, userInfo, getCommentList }) => {
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
      const result = await deleteComment({ id: item.id });
      if (result === true) {
        getCommentList();
        message.success("删除成功");
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
        avatar={
          <Link to={`/user/${item.user.id}`} target="_blank">
            <Avatar src={item.user.avatar} />
          </Link>
        }
        title={
          <Row justify="space-between">
            <Col>
              <Link
                style={{ fontSize: 16 }}
                to={`/user/${item.user.id}`}
                target="_blank"
              >
                {item.user.nickname}
              </Link>
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
                    text={item.childComments.length}
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
