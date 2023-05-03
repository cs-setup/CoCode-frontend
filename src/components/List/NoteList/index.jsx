import React, { useState, useEffect, useRef } from "react";
import { List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { fetchNoteList } from "../../../utils/api/note";
import useUserInfo from "../../../hooks/useUserInfo";
import NoteItem from "./NoteItem";

const NoteList = ({ listOptions }) => {
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const firstPostRef = useRef(Date.now());
  const location = useLocation();
  const userInfo = useUserInfo();

  if (!userInfo) {
    return null;
  }

  if (!listOptions) {
    listOptions = {};
  }

  const getNoteList = async () => {
    let result = {};
    const pageParam = {
      pageSize: 10,
      pageNum: pageNum + 1,
      time: firstPostRef.current,
    };
    const options = {
      specify: {},
      order: {
        updateTime: "desc",
      },
    };
    if (listOptions.userId) {
      // 请求主页note列表
      options.specify["authorId/eq"] = listOptions.userId;
      result = await fetchNoteList({ pageParam, options });
      console.log(result);
    } else if (location.pathname === "/notes") {
      options.specify["authorId/eq"] = userInfo.user.id;
      result = await fetchNoteList({ pageParam, options });
    } else {
      result = await fetchNoteList({ pageParam, options });
    }

    if (result.noteList.length !== 0) {
      setPageNum(pageNum + 1);
      if (result.noteList.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setList([...list, ...result.noteList]);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    getNoteList();
  }, []);
  return (
    <div>
      <InfiniteScroll
        dataLength={list.length}
        next={getNoteList}
        hasMore={hasMore}
        loader={
          <Skeleton
            paragraph={{
              rows: 2,
            }}
            active
          />
        }
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="vertical"
          size="middle"
          split={false}
          dataSource={list}
          grid={{
            column: 1,
          }}
          locale={{ emptyText: <></> }}
          renderItem={(item) => <NoteItem key={item.id} item={item} />}
          style={{ overflow: "hidden" }}
        />
      </InfiniteScroll>
    </div>
  );
};

export default NoteList;
