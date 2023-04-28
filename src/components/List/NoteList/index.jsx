import React, { useState, useEffect, useRef } from "react";
import { List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchNoteList } from "../../../utils/api/note";
import useUserInfo from "../../../hooks/useUserInfo";
import NoteItem from "./NoteItem";

const NoteList = ({ id }) => {
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const firstPostRef = useRef(Date.now());
  const userInfo = useUserInfo();

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
    // if (listOptions.userId) {
    // 请求主页note列表
    options.specify["authorId/eq"] = id || userInfo.user.id;
    result = await fetchNoteList({ pageParam, options });
    console.log(result);
    // } else {
    //   result = await getList({ pageParam, options });
    // }

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
    // setIsReGetList(false);
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
