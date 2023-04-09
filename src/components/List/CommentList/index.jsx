import React, { useState, useEffect, useContext, Suspense } from "react";
import { List, Divider } from "antd";
import { UserContext } from "../../../contexts/UserContext";
import { commentList } from "../../../utils/api/feed";
// import CommentEdit from "../../CommentEdit";
const CommentEdit = React.lazy(() => import("../../CommentEdit"));
import CommentItem from "./CommentItem";

const CommentList = ({ parentItem }) => {
  const [theCommentList, setTheCommentList] = useState([]);
  const { userInfo } = useContext(UserContext);

  // 获取评论列表
  const getCommentList = async () => {
    if (parentItem.childComments) {
      setTheCommentList(parentItem.childComments);
    } else {
      const result = await commentList({ id: parentItem.id });
      setTheCommentList(result.commentList);
    }
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
    </>
  );
};

export default CommentList;
