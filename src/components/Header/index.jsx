import React, { useState } from "react";
import { Col, Row, Menu, Button, Layout, Space, Modal, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import LoginForm from "../LoginForm";
import style from "./index.module.css";

const items = [
  {
    label: "首页",
    key: "mail",
  },
  {
    label: "论坛",
    key: "app",
  },
  {
    label: "圈子",
    key: "squre",
  },
];

export default function Header(props) {
  const [current, setCurrent] = useState("mail");
  const [openLoginForm, setOpenLoginForm] = useState(false);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const showLoginFrom = () => {
    setOpenLoginForm(true);
  };
  const closeLoginFrom = () => {
    setOpenLoginForm(false);
  };

  return (
    <>
      <Layout.Header className={style.header}>
        <Row justify="center">
          <Col span={12}>
            <Space size="large">
              <div className={style.title}>CoCode</div>
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
              />
            </Space>
          </Col>
          <Col span={3} flex="flex-docuration: row-reserve">
            <Space size="large">
              <Button type="primary" size="large">
                <EditOutlined />
                发布帖子
              </Button>
              <Button type="default" size="large" onClick={showLoginFrom}>
                注册/登录
              </Button>
            </Space>
          </Col>
        </Row>
      </Layout.Header>
      {openLoginForm && (
        <Modal
          centered
          open={openLoginForm}
          footer={null}
          onCancel={closeLoginFrom}
          width={800}
          style={{ height: "400px", backgroundColor: "" }}
        >
          <Row justify="start">
            <Col xs={24} sm={24} md={16}>
              <Card style={{height: "100%"}}>
                <LoginForm></LoginForm>
              </Card>
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
}
