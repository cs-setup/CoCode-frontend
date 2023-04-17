import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Button, Row, Col, Space, Image } from "antd";
import { UserContext } from "../../contexts/UserContext";
import { UserOutlined } from "@ant-design/icons";
import { fetchUserInfo } from "../../utils/api/user";

const UserInfo = ({ userId }) => {
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState({});

  if (!userInfo) {
    return null;
  }

  const getUserInfo = async () => {
    const result = await fetchUserInfo({ id: userId });
    setUser(result.user);
  };

  useEffect(() => {
    if (userId === userInfo.user.id) {
      setUser(userInfo.user);
    } else {
      getUserInfo();
    }
  }, []);

  return (
    <>
      <Card>
        <Row justify="space-between" align="middle" wrap={true} gutter={[0,16]}>
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
          {userId === userInfo.user.id ? (
            <Col>
              <Button type="primary">
                <Link to="/user/settings/profile">编辑资料</Link>
              </Button>
            </Col>
          ) : (
            <Col>
              <Space>
              <Button type="primary">
                关注
              </Button>
              <Button type="primary">
                私聊
              </Button>
              </Space>
            </Col>
          )}
        </Row>
      </Card>
    </>
  );
};

export default UserInfo;
