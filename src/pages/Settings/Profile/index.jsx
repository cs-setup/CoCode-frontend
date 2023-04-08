import React, { useState, useContext } from "react";
import { Form, Input, Button, Upload, Avatar, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { UserContext } from "../../../contexts/UserContext";
import Settings from "..";
import { updateAvatar } from "../../../utils/api/user";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { userInfo, setUpdateUser } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState("");
  const [showMask, setShowMask] = useState(false);

  if (!userInfo.user || !userInfo.user.avatar) {
    return null;
  }

  const handleMaskToggle = () => {
    setShowMask(!showMask);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    setLoading(true);
    const result = await updateAvatar(formData);
    if (result) {
      setImageUrl(result.newAvatar);
      setLoading(false);
      setUpdateUser(true);
      message.success("修改成功");
    } else {
      setLoading(false);
      message.error("修改失败");
    }

    setShowMask(false);
  };
  return (
    <Settings>
      <Upload
        action=""
        listType="picture-circle"
        beforeUpload={handleUpload}
        maxCount={1}
        showUploadList={false}
        onMouseEnter={handleMaskToggle}
        onMouseLeave={handleMaskToggle}
      >
        {loading ? (
          <LoadingOutlined />
        ) : (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {showMask && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "rgba(116,116,116,0.4)",
                  opacity: 1,
                  transition: "opacity 0.2s ease-in-out",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "bold",
                  zIndex: 100,
                }}
              >
                修改我的头像
              </div>
            )}
            <Avatar
              src={imageUrl ? imageUrl : userInfo.user.avatar}
              style={{ width: "100%", height: "100%" }}
            ></Avatar>
          </div>
        )}
      </Upload>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Input">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </Settings>
  );
};

export default Profile;
