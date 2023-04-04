import { Avatar, message, Popover } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { UserContext } from "../../contexts/UserContext";

const AvatarInfo = () => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const { userInfo} = useContext(UserContext)
  const navigate = useNavigate();
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    message.info("已退出登录");
  };

  return (
    <div>
      <Popover
        content={
          <div>
            <span onClick={logOut}>退出登录</span>
          </div>
        }
      >
        <Avatar size="large" src={userInfo.user.avatar}></Avatar>
      </Popover>
    </div>
  );
};

export default AvatarInfo;
