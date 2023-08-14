import React, { useState, useEffect } from "react";
import {
  Spin,
  Modal,
  Card,
  Form,
  Input,
  Button,
  Radio,
  Space,
  Upload,
} from "antd";
import Vditor from "vditor";
import "vditor/dist/index.css";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import EditorHeader from "../../components/EditorHeader";
import { publish } from "../../utils/api/note";
import { message } from "antd";

const Editor = () => {
  const [vd, setVd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [radioValue, setRadioValue] = useState("noCover");
  const [cover, setCover] = useState();
  const [submitType, setSubmitType] = useState("0");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onCancel = () => {
    setOpen(false);
  };

  // 封面
  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  // 发布方式
  const typeChange = (e) => {
    setSubmitType(e.target.value);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
    form.setFieldsValue({ title: e.target.value });
  };

  // 上传封面
  const handleUpload = async (file) => {
    setCover(file.file);
  };

  // 发布笔记
  const publishNote = async (values) => {
    setPublishLoading(true);
    values.title = title;
    values.content = vd.getValue();
    values.scope = submitType;
    values.flag = 0;
    if (cover) {
      values.cover = cover;
    }
    const result = await publish(values);

    if (result.id) {
      message.success("发布成功");
      navigate(`/note/${result.id}`, { replace: true });
    } else {
      message.error("发布失败");
    }
    setPublishLoading(false);
  };

  // 编辑器初始化
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
      <EditorHeader
        setOpen={setOpen}
        titleChange={titleChange}
        title={title}
      ></EditorHeader>
      <Spin spinning={loading} delay={200} size='large' tip='编辑器加载中...'>
        <div id='vditor' className='vditor' />
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
        <Card style={{ height: "100%", width: "100%" }}>
          <Form name='publishNote' onFinish={publishNote} form={form}>
            <Form.Item
              name='title'
              label='标题'
              rules={[
                {
                  required: true,
                  message: "标题不能为空",
                },
                {
                  message: "标题不能超过50字",
                  max: 50,
                },
              ]}
            >
              <Input
                value={form.getFieldValue("title")}
                onChange={titleChange}
              />
            </Form.Item>
            <Form.Item
              name='description'
              label='描述'
              htmlFor='sss'
              rules={[
                {
                  required: true,
                  message: "描述不能为空",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Space direction='vertical' size='large'>
                <Radio.Group value={radioValue} onChange={onRadioChange}>
                  <Radio value='noCover'>无封面</Radio>
                  <Radio value='imgCover'>单图封面</Radio>
                </Radio.Group>
                {radioValue === "imgCover" && (
                  <Upload
                    name='cover'
                    action=''
                    listType='picture'
                    beforeUpload={() => false}
                    maxCount={1}
                    showUploadList={true}
                    onChange={handleUpload}
                    rules={[{ required: true, message: "请上传封面" }]}
                  >
                    <Button icon={<UploadOutlined />}>上传封面</Button>
                  </Upload>
                )}
              </Space>
            </Form.Item>
            <Form.Item>
              <Radio.Group value={submitType} onChange={typeChange}>
                <Radio value='0'>公开发布</Radio>
                <Radio value='1'>仅自己可见</Radio>
              </Radio.Group>
            </Form.Item>
            <Button type='primary' htmlType='submit' loading={publishLoading}>
              发布
            </Button>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default Editor;
