import React from "react";
import { Card, Space } from "antd";
import { HomeProvider } from "../../contexts/HomeContext";
import useLogin from "../../hooks/useLogin";
import TwoColumn from "../../components/Layout/TwoColumn";
import FeedList from "../../components/List/FeedList";
import FeedEdit from "../../components/FeedEdit";

const LeftColumn = () => {
  const isLogin = useLogin();
  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        {isLogin && (
          <Card>
            <FeedEdit />
          </Card>
        )}
        <Card
          title={<div>沸点列表</div>}
          headStyle={{ minHeight: 48 }}
          size="small"
        >
          <FeedList />
        </Card>
      </Space>
    </>
  );
};

const RightColumn = () => {
  return (
    <Card size="small">
      <img src="/logo.webp" style={{ width: "100%" }} />
    </Card>
  );
};

export default function Home() {
  return (
    <>
      <HomeProvider>
        <TwoColumn left={<LeftColumn />} right={<RightColumn />} />
      </HomeProvider>
    </>
  );
}
