import React, { useState, useEffect, useCallback } from "react";
import { Spin, Modal, Row, Col, Card, Form, Input, Button } from "antd";
import Vditor from "vditor";
import "vditor/dist/index.css";
import EditorHeader from "../../components/EditorHeader";
import { publish } from "../../utils/api/note";

const Editor = () => {
  const [vd, setVd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [publishLoading, setPublishLoading] = useState(false)
  const [open, setOpen] = useState(false);

  const onCancel = () => {
    setOpen(false);
  };

  const handleSubmit = useCallback(
    (noteTitle) => {
      setTitle(noteTitle);
      setOpen(true);
    },
    [title]
  );

  const publishNote = async (values) => {
    setPublishLoading(true)
    values.title = title;
    values.content = vd.getHTML();
    values.scope = 0;
    values.flag = 0;
    values.time = null;
    console.log(values);
    const result = await publish(values)
    setPublishLoading(false)

  };

  useEffect(() => {
    setLoading(true);
    const vditor = new Vditor("vditor", {
      after: () => {
        setVd(vditor);
        setLoading(false);
      },
      mode: "ir",
      width: "100%",
      height: "calc(100vh - 64px)",
      placeholder: "记录点什么吧...",
      cache: {
        enable: false,
      },
      preview: {
        actions: [],
        maxWidth: "900",
        mode: "both",
        hljs: {
          enable: true,
          style: "github",
          lineNumber: true,
        },
      },
      counter: {
        enable: true,
      },
      toolbar: [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",
        "|",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        "fullscreen",
        "edit-mode",
      ],
    });
  }, []);

  return (
    <>
      <EditorHeader handleSubmit={handleSubmit}></EditorHeader>
      <Spin spinning={loading} delay={200} size="large" tip="编辑器加载中...">
        <div id="vditor" className="vditor" />
      </Spin>
      <Modal
        centered
        open={open}
        footer={null}
        onCancel={onCancel}
        width={600}
        style={{ height: "400px" }}
        maskClosable={true}
        closable={false}
      >
        <Row justify="start">
          {/* <Col xs={24} sm={24} md={16}> */}
          <Card style={{ height: "100%", width: "100%" }}>
            <Form name="publishNote" onFinish={publishNote}>
              <Form.Item
                name="description"
                label="描述"
                rules={[
                  {
                    required: true,
                    message: "描述不能为空",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={publishLoading}>
                发布
              </Button>
            </Form>
          </Card>
          {/* </Col> */}
        </Row>
      </Modal>
    </>
  );
};

export default Editor;
