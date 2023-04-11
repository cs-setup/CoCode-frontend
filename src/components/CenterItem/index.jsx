import React from 'react'
import { Row, Col } from 'antd'

const CenterItem = ({children}) => {
  return (
    <Row justify="center">
        <Col span={24} style={{textAlign: "center"}}>{children}</Col>
    </Row>
  )
}

export default CenterItem