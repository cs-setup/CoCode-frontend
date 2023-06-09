import React, { useState, useEffect, useContext, useRef } from "react";
import { List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedItem from "./FeedItem";
import { getList } from "../../../utils/api/feed";
import { HomeContext } from "../../../contexts/HomeContext";
import { UserContext } from "../../../contexts/UserContext";

const FeedList = ({ listOptions }) => {
  const { userInfo } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isReGetList, setIsReGetList] = useState(false);
  const { publishItem, setPublishItem } = useContext(HomeContext);
  const firstPostRef = useRef(Date.now());

  if (!userInfo) {
    return null;
  }

  if (!listOptions) {
    listOptions = {};
  }

  // 请求文章列表
  const getArticleList = async () => {
    let result = {};
    const pageParam = {
      pageSize: 10,
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
    if (listOptions.userId) {
      // 请求主页feed列表
      options.specify["authorId/eq"] = listOptions.userId;
      result = await getList({ pageParam, options });
    } else {
      result = await getList({ pageParam, options });
    }

    if (result.postList.length !== 0) {
      setPageNum(pageNum + 1);
      if (result.postList.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setList([...list, ...result.postList]);
    }else{
      setHasMore(false)
    }
    setIsReGetList(false);
  };

  useEffect(() => {
    getArticleList();
  }, [isReGetList]);

  // 插入新帖子
  useEffect(() => {
    if (publishItem.id) {
      setList([publishItem, ...list]);
      setPublishItem({});
    }
  }, [publishItem]);

  // 重新请求文章
  const reGetList = () => {
    setList([]);
    setPageNum(0);
    setIsReGetList(true);
  };

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
        renderItem={(item) => (
          <FeedItem
            key={item.id}
            item={item}
            userInfo={userInfo}
            reGetList={reGetList}
          />
        )}
        style={{ overflow: "hidden" }}
      />
    </InfiniteScroll>
  );
};

export default FeedList;
