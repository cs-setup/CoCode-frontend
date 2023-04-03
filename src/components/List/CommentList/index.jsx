import React, { useState, useEffect } from "react";
import { Space, Divider } from "antd";
import { commentList } from "../../../utils/api/feed";
import CommentEdit from "../../CommentEdit";

const CommentList = ({ id }) => {
  const [theCommentList, setTheCommentList] = useState([]);
  const getCommentList = async () => {
    const result = await commentList({ id });
    setTheCommentList(result.commentList);
  };
  useEffect(() => {
    getCommentList();   
    setTimeout(()=>{
      console.log(theCommentList);
    },3000)
  }, []);

  return (
    <>
        <CommentEdit id={id} />
        {theCommentList.map(item=> <div>{item}</div>)}
    </>
  );
};

export default CommentList;
