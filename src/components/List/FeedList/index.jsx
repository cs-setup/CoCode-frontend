import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedItem from "./FeedItem";
import { getList } from "../../../utils/api/feed";
import { HomeContext } from "../../../contexts/HomeContext";
import { UserContext } from "../../../contexts/UserContext";

const FeedList = ({ myList }) => {
  const { userInfo } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { publishItem, setPublishItem } = useContext(HomeContext);
  const firstPostRef = useRef(Date.now());

  // 请求文章列表
  const getArticleList = async () => {
    let result = {};
    const pageParam = {
      pageSize: 15,
      pageNum: pageNum + 1,
      time: firstPostRef.current,
    };
    const options = {
      specify: {},
      order: {
        createTime: "desc",
        likedCount: "desc",
      },
    };
    if (myList && userInfo.user.id) {
      // 请求我的feed列表
      options.specify["authorId/eq"] = userInfo.user.id;
      result = await getList({ pageParam, options });
    } else {
      result = await getList({ pageParam, options });
    }

    if (result.postList) {
      setPageNum(pageNum + 1);
      if (result.postList.length < 15) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setList([...list, ...result.postList]);
    }
  };
  useEffect(() => {
    getArticleList();
  }, [userInfo]);

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
          column: 1,
        }}
        locale={{ emptyText: <></> }}
        renderItem={(item) => <FeedItem item={item} />}
        style={{ overflow: "hidden" }}
      />
    </InfiniteScroll>
  );
};

export default FeedList;
