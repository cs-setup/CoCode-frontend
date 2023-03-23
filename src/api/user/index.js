import request from "../request"
export const register = async (params) => {
    const result = await request.post('user/register', params, {
        headers: {
            'notoken': true
        }
    })
    return result.data
}

export const login = async (params) => {
    const result = await request.post('user/login', params, {
        headers: {
            'notoken': true
        }
    })
    return result.data
}

export const verify = async (params) => {
    const result = await request.post('user/message', params, {
        headers: {
            'notoken': true
        }
    })
    console.log(result);
    return result.data
}