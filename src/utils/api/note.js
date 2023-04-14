import request from "./request";
export const fetchNoteList = async (params) => {
    console.log(params,222);
    const result = await request.get("/note/list")
    console.log(result,111);
    return result.data
};
