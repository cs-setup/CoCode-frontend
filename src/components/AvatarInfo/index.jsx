import React from "react";
import { Row, Col, Avatar, Menu, Space } from "antd";
import { Link } from "react-router-dom";

const AvatarInfo = ({ userInfo, logOut }) => {
  return (
    <>
      <Space direction="vertical">
        <Row justify="center">
          <Col style={{ textAlign: "center" }} span={24}>
            <Avatar size={64} src={userInfo.user.avatar}></Avatar>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24} style={{ textAlign: "center" }}>
            <div className="author-name">{userInfo.user.nickname}</div>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24}>
            <Menu mode="vertical" style={{ textAlign: "center" }} selectedKeys={["3"]}>
            
              <Menu.Item key="1">
              <Link to="/user">
                个人中心</Link>
              </Menu.Item>
              <Menu.Item
              key="2"
                onClick={() => {
                    logOut();
                }}
              >
                退出登录
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default AvatarInfo;
