import React, { useState, useEffect } from "react";
import { List, Divider } from "antd";
import { commentList } from "../../../utils/api/feed";
import CommentEdit from "../../CommentEdit";
import CommentItem from "./CommentItem";

const CommentList = ({ id }) => {
  const [theCommentList, setTheCommentList] = useState([]);
  const getCommentList = async () => {
    const result = await commentList({ id });
    setTheCommentList(result.commentList);
  };
  useEffect(() => {
    getCommentList();
    setTimeout(() => {
      console.log(theCommentList);
    }, 3000);
  }, []);

  return (
    <>
      <CommentEdit id={id} />
      {theCommentList.length !== 0 && (
        <>
          <Divider></Divider>
          <List
            itemLayout="vertical"
            size="small"
            dataSource={theCommentList}
            grid={{
              column: 1,
            }}
            locale={{ emptyText: <></> }}
            renderItem={(item) => <CommentItem item={item} />}
            pagination={{align:"center"}}
            // bordered
          />
        </>
      )}
    </>
  );
};

export default CommentList;
