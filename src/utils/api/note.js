import request from "./request";
export const fetchNoteList = async (params) => {
  const result = await request.post("/note/list", params);
  return result.data;
};

export const publish = async (params) => {
  const result = await request.post("/note", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (result.code === 10000) {
    return result.data;
  }
};

export const note = async (params) => {
  const { id } = params;
  const result = await request.get(`/note/${id}`);
  if (result.code === 10000) {
    return result.data;
  }
};

export const collect = async (params) => {
  console.log(params);
  const result = await request.post("/note/collect", params);
  console.log(result);
  if (result.code === 10000) {
    return true;
  } else {
    return false;
  }
};
