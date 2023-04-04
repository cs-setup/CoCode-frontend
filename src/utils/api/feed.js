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

export const getMyList = async (params) =>{
    const {id, ...option} = params
    const result = await request.post(`/post/user/${id}`,option)
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
    const result = await request.get(`/comment/list/post/${params.id}`)
    if(result.code === 10000){
        return result.data
    }
}

export const comment = async (params) => {
    const result = await request.post("/comment",params)
    console.log(result);
    if(result.code === 10000){
        return true
    }else if(result.code === 10003){
        message.warning("账号未登录")
    }
}