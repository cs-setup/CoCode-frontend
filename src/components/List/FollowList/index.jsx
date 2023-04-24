import React, { useState, useEffect, useRef } from "react";
import { List, Skeleton, Avatar } from "antd";
import { Link } from "react-router-dom";
import { fetchFollow, fetchFan } from "../../../utils/api/user";
import InfiniteScroll from "react-infinite-scroll-component";

const FollowList = ({ type, id }) => {
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const firstPostRef = useRef(Date.now());

  const getList = async () => {
    let result = {};
    let newList = [];
    const pageParam = {
      pageSize: 10,
      pageNum: pageNum + 1,
      time: firstPostRef.current,
      id: id,
    };

    if (type === "follow") {
      result = await fetchFollow(pageParam);
      newList = result.followList;
    } else if (type === "fan") {
      result = await fetchFan(pageParam);
      newList = result.fanList;
    }

    if (newList.length !== 0) {
      setPageNum(pageNum + 1);
      if (newList.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setList([...list, ...newList]);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <InfiniteScroll
      dataLength={list.length}
      next={getList}
      hasMore={hasMore}
      loader={
        <Skeleton
          avatar
          paragraph={{
            rows: 0,
          }}
          active
        />
      }
      scrollableTarget="scrollableDiv"
    >
      <List
        itemLayout="horizontal"
        size="small"
        split={true}
        dataSource={list}
        locale={{ emptyText: <></> }}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Link to={`/user/${item.id}`} target="_blank">
                  <Avatar src={item.avatar} />
                </Link>
              }
              title={
                <Link
                  style={{ fontSize: 16, color: "#000" }}
                  to={`/user/${item.id}`}
                  target="_blank"
                >
                  {item.nickname}
                </Link>
              }
              description={
                <div style={{ fontSize: 14 }}>{item.description}</div>
              }
            />
          </List.Item>
        )}
      />
    </InfiniteScroll>
  );
};

export default FollowList;
