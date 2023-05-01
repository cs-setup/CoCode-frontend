import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import TwoColumn from "../../components/Layout/TwoColumn";
import UserInfo from "../../components/UserInfo";
import NoteList from "../../components/List/NoteList";

const LeftColumn = () => {
  return (
    <Space direction="vertical" style={{ display: "flex" }}>
      <UserInfo></UserInfo>
      <Card title="我的笔记" size="small" headStyle={{ minHeight: 48 }}>
        <NoteList />
      </Card>
    </Space>
  );
};

const RightColumn = () => {
  return (
    <Card size="small">
      <Link to="/editor" target="_blank">
        <Button type="primary" size="large" style={{ width: "100%" }}>
          <EditOutlined />
          开始创作
        </Button>
      </Link>
    </Card>
  );
};

const Notes = () => {
  return <TwoColumn left={<LeftColumn />} right={<RightColumn />} />;
};

export default Notes;
