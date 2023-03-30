import request from "./request"

export const getList = async (params) => {
    const result = await request.post("/post/feed/latest",params)
    if(result.code == 10000){
        return result.data
    }else{
        return {}
    }
}