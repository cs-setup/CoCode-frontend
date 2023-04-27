import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Card, Row, Col, Avatar, Space, Divider } from "antd";
import { note } from "../../utils/api/note";
import formatTime from "../../utils/formatTime";
import TwoColumn from "../../components/Layout/TwoColumn";
import CommentList from "../../components/List/CommentList"

const LeftColumn = ({ note }) => {
  return (
    <Card
      title={
        <Row align="middle">
          <Col span={24}>
            <h1 style={{ fontWeight: "bold", margin: 0, paddingTop: 16 }}>
              {note.title}
            </h1>
          </Col>
          <Col span={24}>
            <Row gutter={16} align="middle">
              <Col>
                <Avatar src={note.user.avatar} size={40} />
              </Col>
              <Col>
                <div>{note.user.nickname}</div>
                <div
                  style={{ fontSize: 14, color: "#8A919F", fontWeight: "400" }}
                >
                  {formatTime(note.createTime)}
                </div>
              </Col>
            </Row>
          </Col>
          <Divider style={{ marginBottom: 0 }} />
          {note.cover && <img src={note.cover} style={{ width: "100%" }} />}
        </Row>
      }
      headStyle={{ border: "none" }}
    >
      <Space direction="vertical" style={{display: "flex"}} size="large">
        <ReactMarkdown children={note.content} />
        <CommentList />
      </Space>
    </Card>
  );
};
const RightColumn = () => {
  return <Card>111</Card>;
};

const NoteDetail = () => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const getNoteDetail = async () => {
    const result = await note({ id });
    if (result) {
      setContent(result);
    }
  };
  useEffect(() => {
    getNoteDetail();
  }, []);
  if (!content) {
    return null;
  }
  return (
    <TwoColumn
      left={<LeftColumn note={content.note} />}
      right={<RightColumn />}
    />
  );
};

export default NoteDetail;
