import React, { useState, useContext } from "react";
import { Card, Col, List, Row, Modal } from "antd";
import { UserContext } from "../../../contexts/UserContext";
import Settings from "..";
import CenterItem from "../../../components/CenterItem";
import Password from "./Password";
import Phone from "./Phone";

const Account = () => {
  const [openModal, setOpenModal] = useState(false);
  const [handleType, setHandleType] = useState("");
  const { userInfo } = useContext(UserContext);

  if (!userInfo.user) {
    return null;
  }

  const showModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <Settings>
      <Card bordered={false} size="small">
        <List itemLayout="vertical">
          <List.Item>
            <Row justify="space-between">
              <Col span={4}>
                <CenterItem>手机</CenterItem>
              </Col>
              <Col>{userInfo.user.phone}</Col>
              <Col span={4}>
                <CenterItem>
                  <a
                    onClick={() => {
                      showModal();
                      setHandleType("phone");
                    }}
                  >
                    换绑
                  </a>
                </CenterItem>
              </Col>
            </Row>
          </List.Item>
          <List.Item>
            <Row justify="space-between">
              <Col span={4}>
                <CenterItem>密码</CenterItem>
              </Col>
              <Col span={4}>
                <CenterItem>
                  <a
                    onClick={() => {
                      showModal();
                      setHandleType("password");
                    }}
                  >
                    重置
                  </a>
                </CenterItem>
              </Col>
            </Row>
          </List.Item>
        </List>
      </Card>

      <Modal
        centered
        open={openModal}
        footer={null}
        onCancel={closeModal}
        width="400px"
        maskClosable={false}
        destroyOnClose={true}
        title={handleType == "phone" ? "手机换绑" : "修改密码"}
      >
        <Row justify="start">
          <Col span={24}>
            <Card bordered={false}>
              {handleType == "phone" ? (
                <Phone closeModal={closeModal} />
              ) : (
                <Password closeModal={closeModal} />
              )}
            </Card>
          </Col>
        </Row>
      </Modal>
    </Settings>
  );
};

export default Account;
