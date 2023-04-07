import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Space } from "antd";
import useLogin from "../../hooks/useLogin";
import TwoColumn from "../../components/Layout/TwoColumn";
import UserInfo from "../../components/UserInfo";
import FeedList from "../../components/List/FeedList";
import { message } from "antd";

const LeftColumn = () => {
  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }}>
        <UserInfo></UserInfo>
        <Card title="我的沸点">
          <FeedList myList={true} />
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
  const navigate = useNavigate();
  const isLogin = useLogin()
  useEffect(() => {
    if (!isLogin) {
      navigate("/", { replace: true });
      message.warning("请先登录");
    }
  }, []);
  return (
    <>
      <TwoColumn left={<LeftColumn />} right={<RightColumn />}></TwoColumn>
    </>
  );
};

export default UserCenter;
