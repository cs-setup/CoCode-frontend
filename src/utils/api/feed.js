import { message } from "antd";
import request from "./request";

export const getList = async (params) => {
  const result = await request.post("/post/list", params);
  if (result.code == 10000) {
    return result.data;
  } else {
    return {};
  }
};

export const publish = async (params) => {
  const result = await request.post("/post", params);
  if (result.code === 10000) {
    return result.data;
  } else {
    message.error("发布失败");
  }
};

export const like = async (params) => {
  const result = await request.post("/like", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (result.code === 10000) {
    return true;
  } else {
    return false;
  }
};

export const deleteFeed = async (params) => {
  const { id } = params;
  const result = await request.delete(`/post/${id}`);
  if (result.code == 10000) {
    return true;
  } else {
    return false;
  }
};

export const commentList = async (params) => {
  let result;
  console.log(params);
  console.log(params.type);
  if (params.type == "note") {
    result = await request.get(`/comment/list/note/${params.id}`);
  } else {
    result = await request.get(`/comment/list/post/${params.id}`);
  }
  if (result.code === 10000) {
    return result.data;
  }
};

export const comment = async (params) => {
  const result = await request.post("/comment", params);
  if (result.code === 10000) {
    return result.data;
  } else if (result.code === 10003) {
    message.warning("账号未登录");
  }
};

export const deleteComment = async (params) => {
  const { id } = params;
  const result = await request.delete(`/comment/${id}`);
  if (result.code == 10000) {
    return true;
  } else {
    return false;
  }
};
