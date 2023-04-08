import {
    message
} from "antd";
import request from "./request"
export const register = async (params) => {
    const result = await request.post('/user/register', params, {
        headers: {
            'notoken': true,
            'Content-Type': 'multipart/form-data'
        }
    })
    if (result.code == 10000) {
        return true
    } else {
        message.error(result.message)
        return {}
    }
}

export const login = async (params) => {
    const result = await request.post('/user/login', params, {
        headers: {
            'notoken': true,
            'Content-Type': 'multipart/form-data'
        }
    })

    if (result.code == 10000) {
        return result.data
    } else {
        message.error(result.message)
        return {}
    }
}

export const verify = async (params) => {
    const result = await request.post('/user/message', params, {
        headers: {
            'notoken': true,
            'Content-Type': 'multipart/form-data'
        }
    })
    return {}
}

export const fetchUserInfo = async () => {
    const result = await request.get('/user/info')
    return result.data
}

export const updateAvatar = async (params) => {
    const result = await request.put('/user/avatar', params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    if (result.code == 10000) {
        return result.data
    }else{
        return false
    }
}