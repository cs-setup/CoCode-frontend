import React, { useState, useEffect } from "react";
import { List, Divider } from "antd";
import { commentList } from "../../../utils/api/feed";
import CommentEdit from "../../CommentEdit";
import CommentItem from "./CommentItem";

const CommentList = ({ parentItem }) => {
  const [theCommentList, setTheCommentList] = useState([]);

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
      <CommentEdit parentItem={parentItem} getCommentList={getCommentList} />
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
            renderItem={(item) => <CommentItem item={item} />}
            pagination={{
              align: "center",
              pageSize: 5,
              hideOnSinglePage: true,
              size: "small"
            }}
          />
        </>
      )}
    </>
  );
};

export default CommentList;
