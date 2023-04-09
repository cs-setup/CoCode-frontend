import React, { useState, useContext } from "react";
import { Upload, Avatar, message, Card, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { UserContext } from "../../../contexts/UserContext";
import { updateAvatar } from "../../../utils/api/user";
import Settings from "..";
import ProfileForm from "../../../components/ProfileForm";

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
      <Card title="个人资料">
        <Space direction="vertical" style={{ display: "flex" }} size="large">
          <Card
            title="我的头像"
            bordered={false}
            headStyle={{ border: 0 }}
            size="small"
          >
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
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
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
          </Card>
          <Card
            title="我的资料"
            bordered={false}
            headStyle={{ border: 0 }}
            size="small"
          >
            <ProfileForm userInfo={userInfo} setUpdateUser={setUpdateUser} />
          </Card>
        </Space>
      </Card>
    </Settings>
  );
};

export default Profile;
