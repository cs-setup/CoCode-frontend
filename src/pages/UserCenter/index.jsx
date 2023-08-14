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

const LeftColumn = ({ userId, setUserInfo }) => {
  const [current, setCurrent] = useState("post");

  const currentList = {
    post: <FeedList listOptions={{ userId }} />,
    note: <NoteList listOptions={{ userId }} />,
    follow: <FollowList type={"follow"} key={"follow"} id={userId} />,
    fan: <FollowList type={"fan"} key={"fan"} id={userId} />,
  };

  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Space direction='vertical' style={{ display: "flex" }}>
        <UserInfo userId={userId} setUserInfo={setUserInfo}></UserInfo>
        <Card
          size='small'
          headStyle={{ minHeight: 48, justifyContent: "end" }}
          title={
            <Menu
              selectedKeys={[current]}
              onClick={onClick}
              mode='horizontal'
              style={{ border: "none" }}
            >
              <Menu.Item key='post' className='horizontal-menu'>
                <CenterItem>帖子</CenterItem>
              </Menu.Item>
              <Menu.Item key='note' className='horizontal-menu'>
                <CenterItem>笔记</CenterItem>
              </Menu.Item>
              <Menu.Item key='follow' className='horizontal-menu'>
                <CenterItem>关注</CenterItem>
              </Menu.Item>
              <Menu.Item key='fan' className='horizontal-menu'>
                <CenterItem>粉丝</CenterItem>
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
const RightColumn = ({ userInfo }) => {
  return (
    <>
      <Card size='small'>
        <Space style={{ display: "flex", justifyContent: "space-around" }}>
          <Space direction='vertical'>
            <>关注</>{" "}
            <div style={{ textAlign: "center" }}>{userInfo.followCount}</div>
          </Space>
          <Space direction='vertical'>
            <>粉丝</>{" "}
            <div style={{ textAlign: "center" }}>{userInfo.fanCount}</div>
          </Space>
        </Space>
      </Card>
    </>
  );
};

const UserCenter = () => {
  const [userInfo, setUserInfo] = useState({});
  const { userId } = useParams();
  return (
    <>
      <TwoColumn
        key={userId}
        left={<LeftColumn userId={userId} setUserInfo={setUserInfo} />}
        right={<RightColumn userInfo={userInfo} />}
      ></TwoColumn>
    </>
  );
};

export default UserCenter;
