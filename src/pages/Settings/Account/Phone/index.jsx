import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { MobileOutlined, LockOutlined } from "@ant-design/icons";

const Phone = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCounting, setIsCounting] = useState(false);

  const handleSendCode = () => {
    // 发送验证码的请求
    // 如果请求成功，将isCodeSent设为true
    setIsCodeSent(true);
  };

  const handleSubmit = () => {
    // 提交手机号和验证码的请求
    // 如果请求成功，跳转到使用新手机发送验证码绑定
  };

  const verifyTimeOut = () => {
    setIsCounting(true);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      setIsCounting(false);
      setCountdown(60);
    }, 60000);
  };

  return (
    <Form>
      <h2>{isCodeSent? "绑定新手机" : "解绑旧手机"}</h2>
      <Form.Item
        name="phone"
        rules={[
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号" },
        ]}
      >
        <Input
          prefix={<MobileOutlined className="site-form-item-icon" />}
          placeholder="手机号"
        />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[{ required: true, message: "请输入验证码" }]}
      >
        <div className="code-input">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="验证码"
          />
          <Button onClick={handleSendCode} disabled={isCounting}>
            {isCounting ? `${countdown}s` : "发送验证码"}
          </Button>
        </div>
      </Form.Item>

        <Form.Item>
          <Button onClick={handleSubmit} type="primary">提交</Button>
        </Form.Item>
    </Form>
  );
};

export default Phone;
