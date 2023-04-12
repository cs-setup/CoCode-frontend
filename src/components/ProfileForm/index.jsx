import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { updateInfo } from "../../utils/api/user";
import { message } from "antd";

const ProfileForm = ({ userInfo, setUpdateUser }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    if (
      userInfo.user.nickname == values.nickname &&
      userInfo.user.description == values.description
    ) {
      setLoading(false);
      return;
    }
    const result = await updateInfo(values);
    if (result === true) {
      setUpdateUser(true);
      message.success("修改成功");
    }
    setLoading(false);
  };
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      initialValues={{
        nickname: userInfo.user.nickname,
        phone: userInfo.user.phone,
        description: userInfo.user.description,
      }}
    >
      <Form.Item
        name="nickname"
        label="用户名"
        rules={[{ required: true, message: "用户名不能为空" }]}
      >
        <Input showCount maxLength={25} />
      </Form.Item>

      <Form.Item name="description" label="个人简介">
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 6 }}
          showCount
          maxLength={200}
          rows={6}
        >
          {userInfo.user.description}
        </Input.TextArea>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button htmlType="submit" type="primary" loading={loading}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
