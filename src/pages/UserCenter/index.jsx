import React from "react";
import { Row, Col, Card, Space } from "antd";
import TwoColumn from "../../components/Layout/TwoColumn"
import UserInfo from "../../components/UserInfo";
import FeedList from "../../components/List/FeedList";

const LeftColumn = () => {
  return (
    <>
    <Space direction="vertical" style={{display: "flex"}}>
    <UserInfo></UserInfo>
      <Card title="我的沸点">
        <FeedList />
      </Card>
    </Space>
    </>
  )
}
const RightColumn = () => {
  return (
    <></>
  )
}

const UserCenter = () => {
  return (
    <>
      <TwoColumn left={<LeftColumn/>} right={<RightColumn/>}></TwoColumn>
    </>
  );
};

export default UserCenter;
