import {
    message
} from "antd"
import request from "./request"

export const getList = async (params) => {
    const result = await request.post("/post/feed/latest", params)
    if (result.code == 10000) {
        return result.data
    } else {
        return {}
    }
}

export const publish = async (params) => {
    const result = await request.post("/post", params)
    if (result.code === 10000) {
        return result.data
    } else {
        message.error("发布失败")
    }
}

export const like = async (params) => {
    const result = await request.post('/like',params,{headers:{
        'Content-Type': 'multipart/form-data'
    }})
    if (result.code === 10000) {
        return true
    }
}

export const commentList = async (params) =>{
    console.log(`/comment/list/note/${params.id}`);
    const result = await request.get(`/comment/list/post/${params.id}`)
    console.log(result);
    if(result.code === 10000){
        return result.data
    }
}

export const comment = async (params) => {
    console.log(params);
    const result = await request.post("/comment",params)
    console.log(result);
    if(result.code === 1000){
        return result.data
    }
}