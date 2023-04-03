import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { List, Skeleton, Row } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedItem from "./FeedItem";
import { getList } from "../../../utils/api/feed";
import { HomeContext } from "../../../contexts/HomeContext";

const FeedList = () => {
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { publishItem, setPublishItem } = useContext(HomeContext);
  const firstPostRef = useRef(Date.now());

  // 请求文章列表
  const getArticleList = async () => {
    const result = await getList({
      pageSize: 10,
      pageNum: pageNum + 1,
      time: firstPostRef.current,
    });

    setPageNum(pageNum + 1);
    if (result.postList.length == 0) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setList([...list, ...result.postList]);
  };
  useEffect(() => {
    getArticleList();
  }, []);

  useEffect(() => {
    if (publishItem.id) {
      setList([publishItem, ...list]);
      setPublishItem({});
    }
  }, [publishItem]);

  return (
    <InfiniteScroll
      dataLength={list.length}
      next={getArticleList}
      hasMore={hasMore}
      loader={
        <Skeleton
          avatar
          paragraph={{
            rows: 1,
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
          column: 1
        }}
        locale={{ emptyText: <></> }}
        renderItem={(item) => <FeedItem item={item} />}
      />
    </InfiniteScroll>
  );
};

export default FeedList;
