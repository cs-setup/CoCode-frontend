import { message } from "antd";
import request from "../request"
export const register = async (params) => {
    const result = await request.post('/user/register', params, {
        headers: {
            'notoken': true
        }
    })
    return result
}

export const login = async (params) => {
    const result = await request.post('/user/login', params, {
        headers: {
            'notoken': true
        }
    })
    if(!result.data){
        message.error("登录失败")
    }else{
        return result
    }
}

export const verify = async (params) => {
    const result = await request.post('/user/message', params, {
        headers: {
            'notoken': true
        }
    })
    return result.data
}