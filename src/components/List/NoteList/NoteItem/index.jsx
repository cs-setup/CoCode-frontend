import React, { useState, useEffect } from "react";
import { Card, List, Space, Row, Col, Divider, Image, Typography } from "antd";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  LikeTwoTone,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import useLogin from "../../../../hooks/useLogin";
import formatTime from "../../../../utils/formatTime";
import { like } from "../../../../utils/api/feed";

const IconText = ({ icon, text, callback, id }) => (
  <label style={{ cursor: "pointer" }}>
    <Space style={{ fontSize: 14 }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (icon === LikeOutlined || icon === LikeTwoTone) {
            callback({ objectType: "note", objectId: id });
          } else if (icon === StarOutlined) {

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
  const [fetchState, setFetchState] = useState(true);
  const navigate = useNavigate();
  const isLogin = useLogin();

  const comment = () => {
    // navigate('/home', {target: "_blank" })
    window.open(`/note/${item.id}`,"_blank")
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

  // 处理点赞请求失败
  useEffect(() => {
    if (!fetchState) {
      message.error("error");
      isLiked ? item.likedCount-- : item.likedCount++;
      setIsLiked(!isLiked);
      setFetchState(true);
    }
  }, [fetchState]);

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
                        icon={StarOutlined}
                        text={item.collectCount}
                        key="list-vertical-star-o"
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
                <Image src={item.cover} preview={false} />
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
