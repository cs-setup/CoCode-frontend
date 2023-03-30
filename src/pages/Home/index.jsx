import React from "react";
import { Card } from "antd";
import TwoColumn from "../../components/Layout/TwoColumn";
import FeedList from "../../components/List/FeedList";

const LeftColumn = () => {
  return (
    <Card title={<div>沸点列表</div>}>
      <FeedList />
    </Card>
  );
};

const RightColumn = () => {
  return <Card title="队伍动态">aaa</Card>;
};

export default function Home() {
  return (
    <>
      <TwoColumn left={<LeftColumn />} right={<RightColumn />} />
    </>
  );
}
