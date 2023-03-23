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
import { EditOutlined, BellFilled } from "@ant-design/icons";
import LoginForm from "../LoginForm";
import AvatarInfo from "../AvatarInfo";
import SearchInput from "../SearchInput";
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
        <Row justify="center" align="middle" gutter={12}>
          <Col xs={0} sm={6} md={5} lg={4} xl={2} xxl={2}>
            <div className={style.title}>CoCode</div>
          </Col>
          <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </Col>
          <Col xs={20} sm={14} md={10} lg={8} xl={8} xxl={8}>
            <Row align="middle">
              <SearchInput></SearchInput>
              <Col span={24}></Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={5} lg={4} xl={3} xxl={2}>
            <Button type="primary" size="large">
              <EditOutlined />
              发布帖子
            </Button>
          </Col>
          <Col xs={4} sm={4} md={4} lg={2} xl={1} xxl={1}>
            {!loading &&
              (isLoggedIn ? (
                <>
                <Space>
                <Avatar>
                <BellFilled />
                </Avatar>
                <AvatarInfo />
                </Space>
                </>
              ) : (
                <Button type="default" size="large" onClick={showLoginFrom}>
                  注册/登录
                </Button>
              ))}
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
