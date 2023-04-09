import React, {useState, useEffect} from "react";
import { Card, Menu } from "antd";
import TwoColumn from "../../components/Layout/TwoColumn";
import { Link, useLocation, Outlet } from "react-router-dom";

const LeftColumn = ({children}) => {
  return (
    <>
      {children}
    </>
  );
};

const RightColumn = () => {
    const [current, setCurrent] = useState("")
    const location = useLocation();

    useEffect(() => {
      setCurrent(location.pathname.split("/")[3]);
    }, [location.pathname]);


    const onClick = (e) => {
      setCurrent(e.key);
    };
    return (
      <>
        <Card>
            <Menu selectedKeys={[current]} onClick={onClick}>
                <Menu.Item key="profile"><Link to="/user/settings/profile">个人资料</Link></Menu.Item>
                <Menu.Item key="account"><Link to="/user/settings/account">账号设置</Link></Menu.Item>
            </Menu>
        </Card>
      </>
    );
  };

const Settings = ({children}) => {
  return (
    <div>
      <TwoColumn left={<LeftColumn>{children}</LeftColumn>} right={<RightColumn/>}/>
    </div>
  );
};

export default Settings;