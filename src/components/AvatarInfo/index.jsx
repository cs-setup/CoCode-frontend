import {Avatar ,message,Popover} from 'antd'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContext'


const AvatarInfo = () => {
    const {setIsLoggedIn} = useContext(LoginContext)
    const navigate = useNavigate()
    const logOut = ()=>{
        setIsLoggedIn(false);
        localStorage.removeItem("token")
        navigate("/",{replace: true})
        message.info("已退出登录")
    }

    return (
        <div>
            <Popover content={<div ><span onClick={logOut} >退出登录</span></div>}  trigger="click">
                <Avatar size='large' src="https://img1.baidu.com/it/u=3556944590,3804013833&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"></Avatar>
            </Popover>
        </div>
    )
}

export default AvatarInfo   