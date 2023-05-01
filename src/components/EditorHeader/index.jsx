import React, { useEffect, useRef } from "react";
import { Layout, Row, Col, Input, Button } from "antd";

const EditorHeader = ({ title, titleChange, setOpen }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Layout.Header
      style={{ backgroundColor: "#fff", padding: 0, width: "100%" }}
    >
      <Row justify="center">
        <Col xs={0} sm={0} md={0} lg={3}>
          <Row justify="center">
            <Col span={24}>
              <div
                style={{ fontWeight: "bold", fontSize: 32, color: "#13c2c2" }}
              >
                ShareBytes
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={4} sm={3} md={3} lg={0}>
          <Row justify="center">
            <Col size={24}>
              <div
                style={{ fontWeight: "bold", fontSize: 32, color: "#13c2c2" }}
              >
                Sh
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={15} sm={16} md={14} lg={12}>
          <Input
            size="large"
            style={{ borderRadius: 50 }}
            placeholder="请输入标题..."
            value={title}
            onChange={titleChange}
            ref={inputRef}
          />
        </Col>
        <Col span={5} md={3}>
          <Row justify="center">
            <Col size={24}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: 30 }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                发布
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default EditorHeader;
