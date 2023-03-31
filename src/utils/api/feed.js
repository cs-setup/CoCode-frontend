import { message } from "antd"
import request from "./request"

export const getList = async (params) => {
    const result = await request.post("/post/feed/latest",params)
    if(result.code == 10000){
        return result.data
    }else{
        return {}
    }
}

export const publish = async (params) => {
    const result = await request.post("/post",params)
    if(result.code === 10000){
        return result.data
    }else{
        message.error("发布失败")
    }
}