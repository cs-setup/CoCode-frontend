import React, { useState, useEffect, useContext, Suspense } from "react";
import { List, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { UserContext } from "../../../contexts/UserContext";
import { commentList } from "../../../utils/api/feed";
import { Spin } from "antd";
const CommentEdit = React.lazy(() => import("../../CommentEdit"));
import CommentItem from "./CommentItem";

const CommentList = ({ parentItem }) => {
  const [theCommentList, setTheCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);

  // 获取评论列表
  const getCommentList = async () => {
    setLoading(true);
    if (parentItem.childComments) {
      setTheCommentList(parentItem.childComments);
    } else {
      const result = await commentList({ id: parentItem.id });
      setTheCommentList(result.commentList);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <>
      {userInfo && (
        <Suspense fallback={<></>}>
          <CommentEdit
            parentItem={parentItem}
            getCommentList={getCommentList}
            userInfo={userInfo}
          />
        </Suspense>
      )}
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        }
      >
        {theCommentList.length !== 0 && (
          <>
            <Divider>全部评论</Divider>
            <List
              itemLayout="vertical"
              size="middle"
              dataSource={theCommentList}
              grid={{
                column: 1,
              }}
              locale={{ emptyText: <></> }}
              renderItem={(item) => (
                <CommentItem
                  item={item}
                  getCommentList={getCommentList}
                  userInfo={userInfo}
                />
              )}
              pagination={{
                align: "center",
                pageSize: 5,
                hideOnSinglePage: true,
                size: "small",
              }}
            />
          </>
        )}
      </Spin>
    </>
  );
};

export default CommentList;
