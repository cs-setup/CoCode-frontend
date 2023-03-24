import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, MobileOutlined } from "@ant-design/icons";
import { register, login, verify } from "../../utils/api/user";
import { LoginContext } from "../../contexts/LoginContext";
import debounce from "../../utils/debounce";
import "./index.css";

const LoginForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [isCounting, setIsCounting] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { setIsLoggedIn } = useContext(LoginContext);
  const { closeLoginFrom } = props;

  // 提交表单
  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (isLogin) {
        // 登录
        const result = await login(values);
        localStorage.setItem("token", result.token);
        setIsLoggedIn(true);
        message.success("登录成功");
        closeLoginFrom();
      } else {
        // 注册
        const registerResult = await register(values);

        if (!registerResult.data) {
          message.error("注册失败");
        } else {
          const { code, ...formValue } = values;
          const result = await login(formValue);
          localStorage.setItem("token", result.token);
          if (result.token) {
            setIsLoggedIn(true);
            closeLoginFrom();
          }
          message.success("注册成功");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // 切换登录注册
  const onToggle = () => {
    setIsLogin(!isLogin);
  };

  //切换登录方式
  const changeLoginMethod = (e) => {
    e.preventDefault();
    setIsPassword(!isPassword);
  };

  // 手机号输入
  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  // 获取验证码
  const getCode = async () => {
    verifyTimeOut();
    try {
      await verify({ phone });
      message.success("发送成功");
    } catch (error) {}
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
    <div className="login-wrapper">
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
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
            onChange={(e) => {
              onPhoneChange(e);
            }}
          />
        </Form.Item>
        {!isLogin && (
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "请输入密码" },
              {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/,
                message: "密码必须包含数字和字母，且长度在8~18之间",
              },
            ]}
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
            rules={[
              { required: true, message: "请输入密码" },
              {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/,
                message: "密码必须包含数字和字母，且长度在8~18之间",
              },
            ]}
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
              <Button onClick={getCode} disabled={isCounting}>
                {isCounting ? `${countdown}s` : "发送验证码"}
              </Button>
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
          <div className="login-form-toggle" onClick={debounce(onToggle,3000)}>
            {isLogin ? (
              <div>
                没有账号？
                <span style={{ fontSize: "1.3rem", color: "#08979c" }}>
                  去注册
                </span>
              </div>
            ) : (
              <div>
                已有账号？
                <span style={{ fontSize: "1.3rem", color: "#08979c" }}>
                  去登录
                </span>
              </div>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
