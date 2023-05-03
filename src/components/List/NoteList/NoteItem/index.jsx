import React, { useState, useEffect } from "react";
import {
  Card,
  List,
  Space,
  Row,
  Col,
  Divider,
  Image,
  Typography,
  message,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  StarOutlined,
  StarTwoTone,
  LikeOutlined,
  MessageOutlined,
  LikeTwoTone,
  QuestionCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import useLogin from "../../../../hooks/useLogin";
import formatTime from "../../../../utils/formatTime";
import { like } from "../../../../utils/api/feed";
import { collect, deleteNote } from "../../../../utils/api/note";
import useUserInfo from "../../../../hooks/useUserInfo";

const IconText = ({ icon, text, callback, id }) => (
  <label style={{ cursor: "pointer" }}>
    <Space style={{ fontSize: 14 }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (icon === LikeOutlined || icon === LikeTwoTone) {
            callback({ objectType: "note", objectId: id });
          } else if (icon === StarOutlined || icon === StarTwoTone) {
            callback({ noteId: id });
          } else {
            callback();
          }
        }}
      >
        {React.createElement(icon)}
      </div>
      <div>{text}</div>
    </Space>
  </label>
);

const NoteItem = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [isCollected, setIsCollected] = useState(item.isCollected);
  const [likeState, setLikeState] = useState(true);
  const [collectState, setCollectState] = useState(true);
  const isLogin = useLogin();
  const userInfo = useUserInfo();

  if (!userInfo.user) {
    return null;
  }
  console.log(userInfo);

  const comment = () => {
    // navigate('/home', {target: "_blank" })
    window.open(`/note/${item.id}`, "_blank");
  };
  const toUserPage = (e) => {
    e.stopPropagation();
  };

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

  const changeCollect = async (params) => {
    if (!isLogin) {
      return message.warning("用户未登录");
    }
    isCollected ? item.collectCount-- : item.collectCount++;
    setIsCollected(!isCollected);

    const result = await collect(params);
    if (!result) {
      setCollectState(false);
    }
  };

  // 处理点赞请求失败
  useEffect(() => {
    if (!likeState) {
      message.error("点赞失败");
      isLiked ? item.likedCount-- : item.likedCount++;
      setIsLiked(!isLiked);
      setLikeState(true);
    }
  }, [likeState]);

  // 处理收藏请求失败
  useEffect(() => {
    if (!collectState) {
      message.error("收藏失败");
      isCollected ? item.collectCount-- : item.collectCount++;
      setIsCollected(!isCollected);
      setCollectState(true);
    }
  }, [collectState]);

  // 删除帖子
  const handleDelete = async () => {
    try {
      const result = await deleteNote({ noteId: item.id });
      if (result === true) {
        reGetList();
        message.success("删除成功");
      } else {
        message.error("删除失败");
      }
    } catch (e) {
      message.error("删除失败");
    }
  };

  return (
    <Link to={`/note/${item.id}`} target="_blank">
      <List.Item
        key={item.id}
        style={{
          marginBottom: 0,
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Card
          size="small"
          bordered={false}
          style={{ backgroundColor: hovered ? "#F5F5F5" : "white" }}
        >
          <Row justify="space-between">
            <Col>
              <Row gutter={16}>
                <Col style={{ fontSize: 14 }}>
                  <a
                    onClick={toUserPage}
                    href={`/user/${item.user.id}`}
                    target="_blank"
                  >
                    {item.user.nickname}
                  </a>
                </Col>
                <Col style={{ fontSize: 14, color: "#8A919F" }}>
                  {formatTime(item.createTime)}
                </Col>
              </Row>
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
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <MoreOutlined />
                  </div>
                </Tooltip>
              </Col>
            )}
          </Row>
          <Row wrap={false} justify="space-between">
            <Col xs={16} sm={19} md={18} lg={18} xl={19} xxl={20}>
              <Row gutter={[0, 4]}>
                <Col span={24} style={{ fontWeight: "bold" }}>
                  {item.title}
                </Col>
                <Col span={24}>
                  <Row>
                    <Col style={{ fontSize: 14, color: "#8A919F" }}>
                      <Typography.Text
                        ellipsis
                        style={{ fontSize: 14, color: "#8A919F" }}
                      >
                        {item.description}
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={16}>
                    <Col>
                      <IconText
                        icon={isCollected ? StarTwoTone : StarOutlined}
                        text={item.collectCount}
                        id={item.id}
                        callback={changeCollect}
                      />
                    </Col>
                    <Col>
                      <IconText
                        icon={isLiked ? LikeTwoTone : LikeOutlined}
                        text={item.likedCount}
                        id={item.id}
                        callback={changeLike}
                      />
                    </Col>
                    <Col>
                      <IconText
                        icon={MessageOutlined}
                        text={item.commentCount}
                        key="list-vertical-message"
                        callback={comment}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            {item.cover ? (
              <Col>
                <Image
                  src={item.cover}
                  preview={false}
                  style={{ maxHeight: 64 }}
                />
              </Col>
            ) : (
              <Col></Col>
            )}
          </Row>
        </Card>
      </List.Item>
      <Divider style={{ margin: 0 }} />
    </Link>
  );
};

export default NoteItem;
