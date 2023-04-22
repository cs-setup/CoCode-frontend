import React from "react";
import { Space } from "antd";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const noHeader = ["/editor", "/chat/message"];

export default function Layout(props) {
  const location = useLocation();
  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }} size="middle">
        {noHeader.findIndex((path)=> path == location.pathname) === -1 && <Header />}
        {props.children}
        {/* <Footer /> */}
      </Space>
    </>
  );
}
