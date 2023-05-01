import request from "./request";
export const fetchNoteList = async (params) => {
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

export const note = async (params) => { 
  const {id} = params
  const result = await request.get(`/note/${id}`)
  if(result.code === 10000){
    return result.data
  }
 }