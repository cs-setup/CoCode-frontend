import React, { useState, useEffect } from "react";
import { List, Card, Row, Col } from "antd";
import { fetchNoteList } from "../../../utils/api/note";
import NoteItem from "./NoteItem";

const NoteList = () => {
  const [list, setList] = useState([]);
  const getNoteList = async () => {
    const result = await fetchNoteList(333);
    setList(result);
    console.log(result);
  };

  useEffect(() => {
    getNoteList();
  }, []);
  return (
    <div>
        111222
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
          <List.Item key={item.id}>
            <Card bordered={false} size="small">
              <List.Item.Meta
                title={
                  <Row justify="space-between">
                    <Col>
                      <a
                        href={item.href}
                        style={{ fontSize: 20, color: "#000" }}
                      >
                        {item.user.nickname}
                      </a>
                    </Col>
                    {userInfo.user.id === item.user.id && (
                      <Col>
                        <Tooltip
                          title={
                            <Popconfirm
                              placement="leftTop"
                              title="确定要删除吗？"
                              onConfirm={handleDelete}
                              okText="确定"
                              okType="danger"
                              showCancel={false}
                              icon={
                                <QuestionCircleOutlined
                                  style={{
                                    color: "red",
                                  }}
                                />
                              }
                            >
                              <a style={{ color: "#000" }}>删除</a>
                            </Popconfirm>
                          }
                          placement="bottom"
                          trigger="click"
                          color="#fff"
                        >
                          <MoreOutlined />
                        </Tooltip>
                      </Col>
                    )}
                  </Row>
                }
                description={formatTime(item.createTime)}
              />
              <Row justify="center">
                <Col span={24} offset={4}>
                  {item.content}
                </Col>
                <Divider style={{ marginBottom: 8, width: "100%" }}></Divider>
                <Col span={24}>
                  <Row align>
                    <Col span={12}>
                      <IconText
                        icon={isLiked ? LikeTwoTone : LikeOutlined}
                        text={item.likedCount}
                        id={item.id}
                        callback={changeLike}
                      />
                    </Col>
                    <Col span={12}>
                      <IconText
                        icon={MessageOutlined}
                        text={item.commentCount}
                        key="list-vertical-message"
                        callback={showCommentList}
                      />
                    </Col>
                  </Row>
                </Col>

                {showComment && (
                  <>
                    <Divider
                      style={{ width: "100%", marginTop: 8, marginBottom: 16 }}
                    ></Divider>
                    <Col span={24}>
                      <CommentList parentItem={item} />
                    </Col>
                  </>
                )}
              </Row>
            </Card>
          </List.Item>
        )}
        style={{ overflow: "NoteItem" }}
      />
    </div>
  );
};

export default NoteList;
