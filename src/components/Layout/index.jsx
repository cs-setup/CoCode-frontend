import React from "react";
import { Space } from "antd";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function Layout(props) {
  const location = useLocation();
  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }} size="middle">
        {location.pathname !== "/editor" && <Header />}
        {props.children}
        {/* <Footer /> */}
      </Space>
    </>
  );
}
