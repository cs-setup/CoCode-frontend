import { message } from "antd";
import request from "../request"
export const register = async (params) => {
    const result = await request.post('/user/register', params, {
        headers: {
            'notoken': true
        }
    })
    if(result.message == "10000"){
        return true
    }else{
        return
    }
}

export const login = async (params) => {
    const result = await request.post('/user/login', params, {
        headers: {
            'notoken': true
        }
    })
    console.log(result);
    if(!result.data){
        message.error("登录失败")
        return {}
    }else{  
        return result.data
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