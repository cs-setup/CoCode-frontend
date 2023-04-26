import React from "react";
import { Card, List, Space, Row, Col, Divider, Image } from "antd";
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import formatTime from "../../../../utils/formatTime";

const IconText = ({ icon, text, callback, id }) => (
  <Space>
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (icon !== MessageOutlined) {
          callback({ objectType: "comment", objectId: id.toString() });
        } else {
          callback();
        }
      }}
    >
      {React.createElement(icon)}
    </div>
    <div>{text}</div>
  </Space>
);

const NoteItem = ({ item }) => {
  return (
    <>
      <List.Item key={item.id} style={{ marginBottom: 0 }}>
        <Card
          size="small"
          style={{ borderLeft: 0, borderRight: 0 }}
          hoverable={true}
        >
          <Row gutter={16}>
            <Col style={{ fontSize: 14 }}>{item.user.nickname}</Col>
            <Col style={{ fontSize: 14, color: "#8A919F" }}>
              {formatTime(item.createTime)}
            </Col>
          </Row>
          <Row wrap={false} align="center">
            <Col span={18}>
              <Row gutter={[0,4]}>
                <Col span={24} style={{fontWeight: "bold"}}>{item.title}</Col>
                <Col span={24}> 
                  <Row>
                    <Col style={{ color: "#8A919F" }}>{item.description}</Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={16}>
                    <Col>
                      <IconText
                        icon={StarOutlined}
                        text="156"
                        key="list-vertical-star-o"
                      />
                    </Col>

                    <Col>
                      <IconText
                        icon={LikeOutlined}
                        text="156"
                        key="list-vertical-like-o"
                      />
                    </Col>
                    <Col>
                      <IconText
                        icon={MessageOutlined}
                        text="2"
                        key="list-vertical-message"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col>
              <Image
                src="https://remote-obj-1313529792.cos.ap-guangzhou.myqcloud.com/cocode/18c1abe4-092e-4121-893d-85032147366b.jpg"
                preview={false}
              />
            </Col>
          </Row>
        </Card>
      </List.Item>
    </>
  );
};

export default NoteItem;
