import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Button, Row, Col, Space } from "antd";
import { UserContext } from "../../contexts/UserContext";
import { UserOutlined } from "@ant-design/icons";

const UserInfo = () => {
  const { userInfo } = useContext(UserContext);

  if (!userInfo.user || !userInfo.user.avatar) {
    return null;
  }

  return (
    <>
      <Card>
        <Row justify="space-between" align="middle" wrap={true}>
          <Col span={20} xs={18}>
            <Card.Meta
              avatar={<Avatar size={64} src={userInfo.user.avatar} />}
              title={userInfo.user.nickname}
              description={
                <Space align="start">
                  <UserOutlined />
                  <div>{userInfo.user.nickname}的个人主页</div>
                </Space>
              }
            />
          </Col>
          <Col xs={6} sm={4}>
            <Button type="primary"><Link to="/user/settings/profile">编辑资料</Link></Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default UserInfo;
