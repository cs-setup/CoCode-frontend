import { message } from "antd";
import request from "./request";
// 注册
export const register = async (params) => {
  const result = await request.post("/user/register", params, {
    headers: {
      notoken: true,
      "Content-Type": "multipart/form-data",
    },
  });
  if (result.code == 10000) {
    return true;
  } else {
    message.error(result.message);
    return {};
  }
};

// 登录
export const login = async (params) => {
  const result = await request.post("/user/login", params, {
    headers: {
      notoken: true,
      "Content-Type": "multipart/form-data",
    },
  });

  if (result.code == 10000) {
    return result.data;
  } else {
    message.error(result.message);
    return {};
  }
};

// 发送登录注册验证码
export const verify = async (params) => {
  const result = await request.post("/user/message", params, {
    headers: {
      notoken: true,
      "Content-Type": "multipart/form-data",
    },
  });
  if (result.code == 10000) {
    return true;
  } else {
    return false;
  }
};

// 发送换绑手机验证码
export const bindMessage = async (params) => {
  const result = await request.post("/user/bindmessage", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if ((result.code == 10000)) {
    return true;
  } else {
    message.error(result.message);
  }
};

// 旧手机换绑
export const oldPhone = async (params) => {
  const result = await request.put("/user/old", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if ((result.code == 10000)) {
    return true;
  } else {
    message.error(result.message);
    return false
  }
};

// 新手机绑定
export const newPhone = async (params) => {
  const result = await request.put("/user/new", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if ((result.code == 10000)) {
    return true;
  } else {
    message.error(result.message);
    return false
  }
};

// 修改密码
export const password = async (params) => {
  const result = await request.put("/user/password", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (result.code == 10000) {
    return true;
  } else {
    message.error(result.message);
  }
};

// 获取用户信息
export const fetchUserInfo = async () => {
  const result = await request.get("/user/info");
  return result.data;
};

// 更新头像
export const updateAvatar = async (params) => {
  const result = await request.put("/user/avatar", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (result.code == 10000) {
    return result.data;
  } else {
    return false;
  }
};

// 更新用户信息
export const updateInfo = async (params) => {
  const result = await request.put("user/info", params);
  if (result.code == 10000) {
    return true;
  }
};
