import React, { useContext } from "react";
import { Card, Space } from "antd";
import { HomeProvider } from "../../contexts/HomeContext";
import { LoginContext } from "../../contexts/LoginContext";
import TwoColumn from "../../components/Layout/TwoColumn";
import FeedList from "../../components/List/FeedList";
import FeedEdit from "../../components/FeedEdit";

const LeftColumn = () => {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        {isLoggedIn && (
          <Card>
            <FeedEdit />
          </Card>
        )}
        <Card title={<div>沸点列表</div>}>
          <FeedList />
        </Card>
      </Space>
    </>
  );
};

const RightColumn = () => {
  return <Card title="队伍动态">aaa</Card>;
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
