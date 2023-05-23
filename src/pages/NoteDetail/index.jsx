import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Avatar, Space, Divider } from "antd";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js";
import { note } from "../../utils/api/note";
import formatTime from "../../utils/formatTime";
import TwoColumn from "../../components/Layout/TwoColumn";
import CommentList from "../../components/List/CommentList";
import Tocify from "../../components/Tocify";

const LeftColumn = ({ note, setTocify }) => {
  const commentsRef = useRef(null);
  // markdown处理
  const renderer = new marked.Renderer();

  const theTocify = new Tocify();

  useEffect(() => {
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
    });
    renderer.heading = (text, level) => {
      const anchor = theTocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" onclick="return false" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    setTocify(theTocify);
  }, []);

  const html = marked(note.content);

  return (
    <Space direction="vertical" style={{ display: "flex" }}>
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
                    style={{
                      fontSize: 14,
                      color: "#8A919F",
                      fontWeight: "400",
                    }}
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
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Card>
      <Card
        title="评论"
        size="small"
        headStyle={{ minHeight: 48 }}
        ref={commentsRef}
      >
        <CommentList parentItem={note} commentsRef={commentsRef} />
      </Card>
    </Space>
  );
};
const RightColumn = ({ tocify }) => {
  return (
    // <Card title="目录" size="small" headStyle={{ minHeight: 48 }} style={{overflow: "scroll", position: "fixed"}}>
      <div >{tocify && tocify.render()}</div>
    // </Card>
  );
};

const NoteDetail = () => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [tocify, setTocify] = useState(new Tocify());

  const getNoteDetail = async () => {
    const result = await note({ id });
    if (result) {
      setContent(result);
      console.log(result);
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
      left={<LeftColumn note={content.note} setTocify={setTocify} />}
      right={<RightColumn note={content.note} tocify={tocify} />}
    />
  );
};

export default NoteDetail;
