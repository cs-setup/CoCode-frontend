import React from "react";
import { Row, Col, Card } from "antd";

const UserCenter = () => {
  return (
    <>
      <Row justify="center" gutter={12}>
      <Col xs={23} sm={23} md={15} lg={16} xl={13}>
          <Card title="个人信息"><p>userinfor</p></Card>
        </Col>
        <Col xs={0} sm={0} md={8} lg={6} xl={6}>
          <Card>center</Card>
        </Col>
       
      </Row>
    </>
  );
};

export default UserCenter;
