import React, { useState, useEffect } from "react";
import { Card, Menu, Row, Col } from "antd";
import TwoColumn from "../../components/Layout/TwoColumn";
import CenterItem from "../../components/CenterItem";
import { Link, useLocation } from "react-router-dom";

const TitleMeun = () => {
  const [current, setCurrent] = useState("");
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname.split("/")[3]);
  }, [location.pathname]);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={24}>
          {location.pathname.split("/")[3] == "profile"
            ? "个人信息"
            : "账号设置"}
        </Col>
        <Col xs={24} sm={24} md={0}>
          <Menu
            selectedKeys={[current]}
            onClick={onClick}
            mode="horizontal"
            style={{border: "none"}}
          >
            <Menu.Item key="profile" style={{}}>
              <CenterItem>
                <Link to="/user/settings/profile">个人资料</Link>
              </CenterItem>
            </Menu.Item>
            <Menu.Item key="account">
              <CenterItem>
                <Link to="/user/settings/account">账号设置</Link>
              </CenterItem>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </>
  );
};

const LeftColumn = ({ children }) => {
  return (
    <Card title={<TitleMeun />} style={{ minHeight: 558 }} bordered={false}>
      {children}
    </Card>
  );
};

const RightColumn = () => {
  const [current, setCurrent] = useState("");
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname.split("/")[3]);
  }, [location.pathname]);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Card>
        <Menu
          selectedKeys={[current]}
          onClick={onClick}
          style={{ border: "none" }}
        >
          <Menu.Item key="profile">
            <CenterItem>
              <Link to="/user/settings/profile">个人资料</Link>
            </CenterItem>
          </Menu.Item>
          <Menu.Item key="account">
            <CenterItem>
              <Link to="/user/settings/account">账号设置</Link>
            </CenterItem>
          </Menu.Item>
        </Menu>
      </Card>
    </>
  );
};

const Settings = ({ children }) => {
  return (
    <div>
      <TwoColumn
        left={<LeftColumn>{children}</LeftColumn>}
        right={<RightColumn />}
      />
    </div>
  );
};

export default Settings;
