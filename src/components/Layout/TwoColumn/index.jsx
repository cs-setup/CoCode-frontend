import React from "react";
import { Row, Col } from "antd";

const TwoColumn = (props) => {
  return (
    <Row justify="center" gutter={12} style={{width: "100%"}}>
      <Col xs={23} sm={23} md={16} lg={16} xl={16} xxl={12}>
        {props.left}
      </Col>
      <Col xs={0} sm={0} md={6} lg={6} xl={6} xxl={5}>
        {props.right}
      </Col>
    </Row>
  );
};

export default TwoColumn;
