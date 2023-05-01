import React, { useState, useEffect, useContext, Suspense } from "react";
import { List, Divider, Spin } from "antd";
import { UserContext } from "../../../contexts/UserContext";
import { commentList } from "../../../utils/api/feed";
import useLogin from "../../../hooks/useLogin";
const CommentEdit = React.lazy(() => import("../../CommentEdit"));
import CommentItem from "./CommentItem";

const CommentList = ({ parentItem }) => {
  const [theCommentList, setTheCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);
  const isLogin = useLogin();

  // 获取评论列表
  const getCommentList = async () => {
    if (parentItem.commentCount != 0) {
      setLoading(true);
    }
    if (parentItem.childComments) {
      // 一级评论评论列表
      setTheCommentList(parentItem.childComments);
    } else {
      // 帖子/笔记评论列表
      let result;
      if (parentItem.hasOwnProperty("collectCount")) {
        console.log(111);
        result = await commentList({ id: parentItem.id, type: "note" });
      } else {
        result = await commentList({ id: parentItem.id, type: "post" });
      }
      setTheCommentList(result.commentList);
    }
    setLoading(false);
  };

  // 添加最新评论
  const addNewComment = (comment) => {
    setTheCommentList([comment, ...theCommentList]);
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <>
      {isLogin && (
        <Suspense fallback={<></>}>
          <CommentEdit
            parentItem={parentItem}
            addNewComment={addNewComment}
            userInfo={userInfo}
          />
        </Suspense>
      )}
      <Spin spinning={loading}>
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
                  key={item.id}
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
