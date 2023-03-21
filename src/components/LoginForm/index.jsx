import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined, MobileOutlined } from "@ant-design/icons";
// import { register, login } from '../../api/user';
import "./index.css";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPassword, setIsPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      if (isLogin) {
        await login(values);
        message.success("登录成功");
      } else {
        await register(values);
        message.success("注册成功");
        setIsLogin(true);
      }
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  const onToggle = () => {
    setIsLogin(!isLogin);
  };

  const changeLoginMethod = (e) => {
    e.preventDefault();
    setIsPassword(!isPassword);
  };

  return (
    <div className="login-wrapper">
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h2>{isLogin ? "登录" : "注册"}</h2>

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
        {!isLogin && (
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
        )}

        {isLogin && isPassword ? (
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
        ) : (
          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <div className="code-input">
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="验证码"
              />
              <Button>获取验证码</Button>
            </div>
          </Form.Item>
        )}

        {isLogin && (
          <Form.Item>
            <a onClick={changeLoginMethod}>
              {!isPassword ? "密码登录" : "手机验证码登录"}
            </a>
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
            size="large"
          >
            {isLogin ? "登录" : "注册"}
          </Button>
          <div className="login-form-toggle" onClick={onToggle}>
            {isLogin ? "没有账号？去注册" : "已有账号？去登录"}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
