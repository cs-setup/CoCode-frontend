import React, { useState, useEffect, useContext } from "react";
import { Card, Space, Menu, message } from "antd";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import TwoColumn from "../../components/Layout/TwoColumn";
import UserInfo from "../../components/UserInfo";
import FeedList from "../../components/List/FeedList";
import CenterItem from "../../components/CenterItem";
import NoteList from "../../components/List/NoteList";
import FollowList from "../../components/List/FollowList";

const LeftColumn = () => {
  const [current, setCurrent] = useState("post");
  const { userInfo } = useContext(UserContext);
  const { userId } = useParams();

  const currentList = {
    "post": <FeedList listOptions={{userId}} />,
    "note": <div>111</div>,
    "follow": <FollowList type={"follow"} />,
    "fan": <FollowList type={"fan"}/>
  }

  if (!userInfo) {
    return null;
  }

  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }}>
        <UserInfo userId={userId}></UserInfo>
        <Card
        // size="small"
        headStyle={{minHeight: 48,justifyContent: "end"}}
          title={
            <Menu
              selectedKeys={[current]}
              onClick={onClick}
              mode="horizontal"
              style={{ border: "none" }}
            >
              <Menu.Item key="post" className="horizontal-menu">
                <CenterItem>我的沸点</CenterItem>
              </Menu.Item>
              <Menu.Item key="note" className="horizontal-menu">
                <CenterItem>我的笔记</CenterItem>
              </Menu.Item>
              <Menu.Item key="follow" className="horizontal-menu">
                <CenterItem>关注的人</CenterItem>
              </Menu.Item>
              <Menu.Item key="fan" className="horizontal-menu">
                <CenterItem>关注者</CenterItem>
              </Menu.Item>
            </Menu>
          }
        >
          {currentList[current]}
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
