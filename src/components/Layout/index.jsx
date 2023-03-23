import React from "react";
import { Space } from "antd";
import Header from "../Header";
import Footer from "../Footer";

export default function Layout(props) {
  return (
    <>
      <Space direction="vertical" style={{ display: 'flex' }} size="middle">
        <Header />
        {props.children}
        <Footer />
      </Space>
    </>
  );
}
