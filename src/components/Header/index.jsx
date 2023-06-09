import React, { useState, useEffect } from "react";
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
import SearchInput from "../SearchInput";
import Author from "../Author";
import style from "./index.module.css";
import useLogin from "../../hooks/useLogin";

const items = [
  {
    label: <Link to="/home">首页</Link>,
    key: "/home",
  },
  {
    label: <Link to="/explore">逛逛</Link>,
    key: "/explore",
  },
  // {
  //   label: <Link to="/squre">圈子</Link>,
  //   key: "/squre",
  // },
];

export default function Header(props) {
  const [current, setCurrent] = useState("/home");
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const isLogin = useLogin();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(false);
  }, [isLogin]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const showLoginFrom = () => {
    setOpenLoginForm(true);
  };
  const closeLoginFrom = () => {
    setOpenLoginForm(false);
  };

  return (
    <>
      <Layout.Header className={style.header}>
        <Row justify="center" align="middle" gutter={{ xs: 0, sm: 0, md: 12 }} style={{width: "100%"}}>
          <Col xs={0} sm={0} md={6} lg={4} xl={4} xxl={3}>
            <Row justify="center">
              <Col size={24}>
                <Link to="/home">
                  <div className={style.title}>ShareBytes</div>
                </Link>
              </Col>
            </Row>
          </Col>
          <Col xs={4} sm={4} md={0}>
            <Row justify="center">
              <Col size={24}>
                <Link to="/home">
                  <div className={style.title}>SH</div>
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
          <Col xs={12} sm={14} md={10} lg={8} xl={8} xxl={7}>
            <Row align="middle">
              <SearchInput></SearchInput>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={4} lg={4} xl={3} xxl={2}>
            <Row justify="center">
              <Col size={24}>
                <Link to="/notes">
                  <Button type="primary" size="large">
                    <EditOutlined />
                    笔记中心
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
          <Col xs={6} sm={6} md={4} lg={2} xl={2} xxl={2}>
            <Row justify="center">
              <Col size={24}>
                {!loading &&
                  (isLogin ? (
                    <>
                      <Space>
                        <Avatar>
                          <BellFilled />
                        </Avatar>

                        <Author />
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
              <Menu.Item className={style.menuitem} key="/explore">
                <Link to="/explore">逛逛</Link>
              </Menu.Item>
              {/* <Menu.Item className={style.menuitem} key="/squre">
                <Link to="/squre">圈子</Link>
              </Menu.Item> */}
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
