import React from "react";
import { Row, Col } from "antd";

const TwoColumn = (props) => {
  return (
    <Row justify="center" gutter={{ xs: 0, sm: 0, md: 16 }} style={{width: "100%", overflow: "hidden"}}>
      <Col xs={23} sm={23} md={16} lg={14} xl={12} xxl={10}>
        {props.left}
      </Col>
      <Col xs={0} sm={0} md={6} lg={6} xl={5} xxl={4}>
        {props.right}
      </Col>
    </Row>
  );
};

export default TwoColumn;
