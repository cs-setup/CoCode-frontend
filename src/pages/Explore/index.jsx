import React from "react";
import { Card } from "antd";
import TwoColumn from "../../components/Layout/TwoColumn";
import NoteList from "../../components/List/NoteList";

const LeftColumn = () => {
  return (
    <Card title="推荐" size="small" headStyle={{ minHeight: 48 }}>
      <NoteList />
    </Card>
  );
};
const RightColumn = () => {
  return (
    <Card size="small">
      <img src="/logo.webp" style={{ width: "100%" }} />
    </Card>
  );
};

const Explore = () => {
  return <TwoColumn left={<LeftColumn />} right={<RightColumn />} />;
};

export default Explore;
