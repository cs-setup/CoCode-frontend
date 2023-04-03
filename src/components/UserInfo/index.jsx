import React, { useContext } from "react";
import { Card, Avatar, Button, Row, Col } from "antd";
import { LoginContext } from "../../contexts/LoginContext";
import FeedList from "../List/FeedList";

const UserInfo = () => {
  const { userInfo } = useContext(LoginContext);

  if (!userInfo || !userInfo.user) {
    return null;
  }

  return (
    <>
      <Card>
        <Row justify="space-between" align="middle">
          <Col span={20}>
            <Card.Meta
              avatar={<Avatar size={64} src={userInfo.user.avatar} />}
              title={userInfo.user.nickname}
              description={<div>{userInfo.user.nickname}的个人主页</div>}
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
