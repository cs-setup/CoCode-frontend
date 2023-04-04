import React, { useContext } from "react";
import { Card, Avatar, Button, Row, Col, Space } from "antd";
import { UserContext } from "../../contexts/UserContext";
import { UserOutlined } from "@ant-design/icons";

const UserInfo = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <>
      <Card>
        <Row justify="space-between" align="middle">
          <Col span={20}>
            <Card.Meta
              avatar={<Avatar size={64} src={userInfo.user.avatar} />}
              title={userInfo.user.nickname}
              description={
                <Space>
                  <UserOutlined />
                  <div>{userInfo.user.nickname}的个人主页</div>
                </Space>
              }
            />
          </Col>
          <Col xs={0} sm={0} md={4}>
            <Button>编辑资料</Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default UserInfo;
