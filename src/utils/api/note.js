import request from "./request";
export const fetchNoteList = async (params) => {
  console.log(params, 222);
  const result = await request.post("/note/list",params);
  console.log(result, 111);
  return result.data;
};

export const publish = async (params) => {
  console.log(params);
  const result = await request.post("/note", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(result);
  if (result.code === 10000) {
    return result.data;
  }
};
