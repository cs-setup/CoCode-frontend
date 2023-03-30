import request from "./request"

export const getList = async (params) => {
    console.log(JSON.stringify(params));
    const result = await request.post("/post/feed/latest",params)
    console.log(result);
    return result.data
}