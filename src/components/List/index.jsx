import React from "react";
import { useState, useEffect } from "react";
import { getList } from "../../utils/api/article";
import { List, Space, Skeleton, Avatar } from "antd";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CommList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const getArticleList = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const result = await getList({
      pageSize: 10,
      pageNum: pageNum + 1,
      time: Date.now(),
    });
    setPageNum(pageNum + 1);
    if (result.postList.length == 0) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setList([...list, ...result.postList]);
    setLoading(false);
  };
  useEffect(() => {
    getArticleList();
    console.log(list);
  }, []);

  const loadMoreData = () => {
    console.log(111);
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
      // endMessage={<div style={{ textAlign: "center" }}>无了</div>}
      scrollableTarget="scrollableDiv"
    >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={list}
        locale={{ emptyText: <></> }}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText
                icon={LikeOutlined}
                text={item.likedCount}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={item.commentCount}
                key="list-vertical-message"
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.author.avatar} />}
              title={<a href={item.href}>{item.author.nickname}</a>}
              description={item.createTime}
            />
            {item.content}
          </List.Item>
        )}
      />
    </InfiniteScroll>
  );
};

export default CommList;
