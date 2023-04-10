import React from "react";
import { Layout, Row, Col, Input, Button } from "antd";

const EditorHeader = () => {
  return (
    <Layout.Header style={{ backgroundColor: "#fff" }}>
      <Row justify="center">
        <Col xs={0} sm={0} md={0} lg={5}>
          <Row justify="center">
            <Col size={24}>
              <div
                style={{ fontWeight: "bold", fontSize: 32, color: "#13c2c2" }}
              >
                ShareBytes
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={3} sm={3} md={3} lg={0} >
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
        <Col xs={18} sm={16} md={14} lg={12}>
          <Input
            size="large"
            style={{ height: "100%" }}
            placeholder="请输入标题..."
            bordered={false}
          />
        </Col>
        <Col span={3}>
          <Row justify="center">
            <Col size={24}>
              <Button type="primary" size="large">发布</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default EditorHeader;
