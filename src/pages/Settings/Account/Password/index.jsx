import React from "react";
import { Form, Input, Button, message } from "antd";
import { password } from "../../../../utils/api/user";

const Password = ({ closeModal }) => {
  const onFinish = async (values) => {
    const result = await password(values);
    if (result === true) {
      message.success("修改成功");
      closeModal();
    }
  };

  return (
    <Form name="password-form" onFinish={onFinish} layout="vertical">
      <Form.Item
        label="旧密码"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: "请输入旧密码",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="新密码"
        name="newPassword1"
        rules={[
          {
            required: true,
            message: "请输入新密码",
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{8,18}$/,
            message: "密码必须包含数字和字母，且长度在8~18之间",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="确认新密码"
        name="newPassword2"
        dependencies={["newPassword"]}
        rules={[
          {
            required: true,
            message: "请确认新密码",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword1") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入的新密码不一致"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Password;
