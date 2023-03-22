import React, { useState, useContext, Suspense } from "react";
import {
  Col,
  Row,
  Menu,
  Button,
  Layout,
  Space,
  Modal,
  Card,
  Avatar,
} from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import LoginForm from "../LoginForm";
import style from "./index.module.css";
import { LoginContext } from "../../contexts/LoginContext";
import { useEffect } from "react";

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
  const { isLoggedIn } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isLoggedIn]);

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
              <Suspense fallback={<div></div>}>
                {!loading &&
                  (isLoggedIn ? (
                    <Avatar size="large" icon={<UserOutlined />} />
                  ) : (
                    <Button type="default" size="large" onClick={showLoginFrom}>
                      注册/登录
                    </Button>
                  ))}
              </Suspense>
            </Space>
          </Col>
        </Row>
      </Layout.Header>

      <Modal
        centered
        open={openLoginForm}
        footer={null}
        onCancel={closeLoginFrom}
        width={800}
        style={{ height: "400px" }}
        maskClosable={false}
        destroyOnClose={true}
      >
        <Row justify="start">
          <Col xs={24} sm={24} md={16}>
            <Card style={{ height: "100%" }}>
              <LoginForm closeLoginFrom={closeLoginFrom}></LoginForm>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
