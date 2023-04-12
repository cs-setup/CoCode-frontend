import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { MobileOutlined, LockOutlined } from "@ant-design/icons";
import { bindMessage, oldPhone, newPhone } from "../../../../utils/api/user";
import { useEffect } from "react";

const Phone = ({ closeModal }) => {
  const [isOld, setIsOld] = useState(true);
  const [isCounting, setIsCounting] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(60);

  // 发送验证码
  const handleSendCode = async () => {
    verifyTimeOut();
    let params;
    if (isOld) {
      // 解绑
      params = {
        phone: phone,
        tag: 0,
      };
    } else {
      // 新绑
      params = {
        phone: phone,
        tag: 1,
      };
    }
    const result = await bindMessage(params);
    if (result === true) {
      message.success("发送成功");
    }
  };

  // 表单提交
  const handleSubmit = async () => {
    let result;
    if (isOld) {
      // 旧手机换绑
      result = await oldPhone({ code });
    } else {
      // 新手机绑定
      result = await newPhone({ phone, code });
    }
    if (result === true) {
      message.success(isOld ? "解绑成功" : "绑定成功");
      if (isOld) {
        setIsCounting(false);
        setPhone("");
        setCode("");
        setIsOld(false);
      } else {
        closeModal();
      }
    }
  };

  // 验证码倒计时
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
    <>
    <Form>
      <h2>{isOld ? "验证旧手机" : "绑定新手机"}</h2>
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
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
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
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <Button onClick={handleSendCode} disabled={isCounting}>
            {isCounting ? `${countdown}s` : "发送验证码"}
          </Button>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Form.Item>
      </Form>
    </>
  );
};

export default Phone;
