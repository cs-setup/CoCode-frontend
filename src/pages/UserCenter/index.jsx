import React, { useState, useEffect } from "react";
import { Card, Space, Menu, message } from "antd";
import TwoColumn from "../../components/Layout/TwoColumn";
import UserInfo from "../../components/UserInfo";
import FeedList from "../../components/List/FeedList";
import CenterItem from "../../components/CenterItem";
import NoteList from "../../components/List/NoteList";

const LeftColumn = () => {
  const [current, setCurrent] = useState("post");

  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }}>
        <UserInfo></UserInfo>
        <Card
          title={
            <Menu
              selectedKeys={[current]}
              onClick={onClick}
              mode="horizontal"
              style={{ border: "none", height: "100%" }}
            >
              <Menu.Item key="post" style={{}}>
                <CenterItem>我的沸点</CenterItem>
              </Menu.Item>
              <Menu.Item key="note">
                <CenterItem>我的笔记</CenterItem>
              </Menu.Item>
            </Menu>
          }
        >
          {current == "post" ? <FeedList myList={true} /> : <NoteList/>}
          
        </Card>
      </Space>
    </>
  );
};
const RightColumn = () => {
  return (
    <>
      <Card>此处是广告牌</Card>
    </>
  );
};

const UserCenter = () => {
  return (
    <>
      <TwoColumn left={<LeftColumn />} right={<RightColumn />}></TwoColumn>
    </>
  );
};

export default UserCenter;
