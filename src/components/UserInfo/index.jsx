import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, Avatar, Button, Row, Col, Space, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UserContext } from "../../contexts/UserContext";
import { UserOutlined } from "@ant-design/icons";
import { fetchUserInfo, follow } from "../../utils/api/user";
import useLogin from "../../hooks/useLogin";

const UserInfo = ({ userId, setUserInfo }) => {
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState({});
  const isLogin = useLogin();
  const location = useLocation();

  if (!userInfo) {
    return null;
  }

  const getUserInfo = async () => {
    const result = await fetchUserInfo({ id: userId });
    setUser(result.user);
  };

  const handleFollow = async () => {
    const result = await follow({ userId: user.id });
    if (result === true) {
      message.success("操作成功");
      setUser({ ...user, isFollowed: !user.isFollowed });
    } else {
      message.error("操作失败");
    }
  };

  useEffect(() => {
    if (userId === userInfo.user.id) {
      setUser(userInfo.user);
    } else {
      getUserInfo();
    }
  }, []);

  useEffect(() => {
    if (setUserInfo) {
      setUserInfo(user);
    }
  }, [user]);

  return (
    <>
      <Card>
        <Row
          justify="space-between"
          align="middle"
          wrap={true}
          gutter={[0, 16]}
        >
          <Col>
            <Card.Meta
              avatar={
                <Avatar
                  size={64}
                  icon={
                    <Image
                      src={user.avatar}
                      style={{ borderRadius: "50%", height: 64 }}
                    />
                  }
                />
              }
              title={user.nickname}
              description={
                <Space align="start">
                  <UserOutlined />
                  <div>{user.description}</div>
                </Space>
              }
            />
          </Col>
          {location.pathname.split("/")[1] === "user" &&
            isLogin &&
            (userId === userInfo.user.id ? (
              <Col>
                <Button type="primary">
                  <Link to="/user/settings/profile">编辑资料</Link>
                </Button>
              </Col>
            ) : (
              <Col>
                {user.id && (
                  <Space>
                    <Button
                      type={user.isFollowed ? "default" : "primary"}
                      style={
                        user.isFollowed
                          ? { backgroundColor: "#F5F5F5", color: "#8A919F" }
                          : {}
                      }
                      onClick={handleFollow}
                    >
                      {user.isFollowed ? (
                        "已关注"
                      ) : (
                        <>
                          <PlusOutlined />
                          关注
                        </>
                      )}
                    </Button>
                    <Button type="primary">私聊</Button>
                  </Space>
                )}
              </Col>
            ))}
        </Row>
      </Card>
    </>
  );
};

export default UserInfo;
