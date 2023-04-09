import { Avatar, message, Popover } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { UserContext } from "../../contexts/UserContext";
import AvatarInfo from "../AvatarInfo";

const Author = () => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  
  if (!userInfo.user) {
    return null
  }

  const logOut = () => {
    navigate("/", { replace: true });
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    message.info("已退出登录");
  };

  return (
    <div>
      <Popover
        content={
          <div>
            <AvatarInfo userInfo={userInfo} logOut={logOut}></AvatarInfo>
          </div>
        }
        trigger="hover"
      >
        <Avatar size="large" src={userInfo.user.avatar || null}></Avatar>
      </Popover>
    </div>
  );
};

export default Author;
