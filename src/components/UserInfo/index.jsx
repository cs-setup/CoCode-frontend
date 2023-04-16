import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Button, Row, Col, Space, Image } from "antd";
import { UserContext } from "../../contexts/UserContext";
import { UserOutlined } from "@ant-design/icons";
import { fetchUserInfo } from "../../utils/api/user";

const UserInfo = ({ user }) => {
  const { userInfo } = useContext(UserContext);

  if (!userInfo) {
    return null;
  }

  useEffect(() => {
    if (user) {
      userInfo.user = fetchUserInfo({ id: user.id });
    }
  }, []);

  return (
    <>
      <Card>
        <Row justify="space-between" align="middle" wrap={true}>
          <Col span={20} xs={18}>
            <Card.Meta
              avatar={
                <Avatar
                  size={64}
                  icon={
                    <Image
                      src={userInfo.user.avatar}
                      style={{ width: "100%", height: "100%" }}
                    />
                  }
                />
              }
              title={userInfo.user.nickname}
              description={
                <Space align="start">
                  <UserOutlined />
                  <div>{userInfo.description}</div>
                </Space>
              }
            />
          </Col>
          <Col xs={6} sm={4}>
            <Button type="primary">
              <Link to="/user/settings/profile">编辑资料</Link>
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default UserInfo;
