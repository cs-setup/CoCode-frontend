import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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

const items = [
  {
    label: <Link to="/home">首页</Link>,
    key: "/home",
  },
  {
    label: <Link to="/app">论坛</Link>,
    key: "/app",
  },
  {
    label: <Link to="/squre">圈子</Link>,
    key: "/squre",
  },
];

export default function Header(props) {
  const [current, setCurrent] = useState("home");
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const { isLoggedIn } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(false);
  }, [isLoggedIn]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

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
          <Col xs={0} sm={6} md={5} lg={4} xl={3} xxl={2}>
            <Row justify="center">
              <Col size={24}>
                <Link to="/home">
                  <div className={style.title}>CoCode</div>
                </Link>
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={5}>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </Col>
          <Col xs={17} sm={14} md={10} lg={8} xl={8} xxl={7}>
            <Row align="middle">
              <SearchInput></SearchInput>
              <Col span={24}></Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={5} lg={4} xl={3} xxl={2}>
            <Row justify="center">
              <Col size={24}>
                <Button type="primary" size="large">
                  <EditOutlined />
                  笔记中心
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={7} sm={4} md={4} lg={2} xl={2} xxl={2}>
            <Row>
              <Col size={24}>
                {!loading &&
                  (isLoggedIn ? (
                    <>
                      <Space>
                        <Avatar>
                          <BellFilled />
                        </Avatar>
                        <Link to="/user">
                          <AvatarInfo />
                        </Link>
                      </Space>
                    </>
                  ) : (
                    <Button type="default" size="large" onClick={showLoginFrom}>
                      注册/登录
                    </Button>
                  ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout.Header>
      <Row>
        <Col xs={24} sm={24} md={24} lg={0}>
          <div>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="vertical"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Menu.Item className={style.menuitem} key="/home">
                <Link to="/home">首页</Link>
              </Menu.Item>
              <Menu.Item className={style.menuitem} key="/app">
                <Link to="/app">论坛</Link>
              </Menu.Item>
              <Menu.Item className={style.menuitem} key="/squre">
                <Link to="/squre">圈子</Link>
              </Menu.Item>
            </Menu>
          </div>
        </Col>
      </Row>

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
