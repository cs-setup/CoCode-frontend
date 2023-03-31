import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { List, Space, Skeleton, Avatar } from "antd";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { getList } from "../../../utils/api/feed";
import { HomeContext } from "../../../contexts/HomeContext";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const FeedList = () => {
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { publishItem, setPublishItem } = useContext(HomeContext);
  const firstPostRef = useRef(Date.now())

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

  useEffect(()=>{
    if(publishItem.id){
      setList([publishItem,...list])
      setPublishItem({})
    }
  },[publishItem])


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
              description={dayjs(item.createTime).format("YYYY-MM-DD HH:mm")}
            />
            {item.content}
          </List.Item>
        )}
      />
    </InfiniteScroll>
  );
};

export default FeedList;
