import React from "react";
import { Anchor, Card } from "antd";
import { last } from "lodash";

const { Link } = Anchor;

export default class Tocify {
  tocItems = [];
  index = 0;

  constructor() {
    this.tocItems = [];
    this.index = 0;
  }

  static getInstance() {
    if (!Tocify.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      Tocify.instance = new Tocify();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return Tocify.instance;
  }

  add(text, level) {
    const anchor = `toc${level}${++this.index}`;
    const item = { anchor, level, text };
    const items = this.tocItems;

    if (items.length === 0) {
      // 第一个 item 直接 push
      items.push(item);
    } else {
      let lastItem = last(items); // 最后一个 item

      if (item.level > lastItem.level) {
        // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 2; i++) {
          const { children } = lastItem;
          if (!children) {
            // 如果 children 不存在
            lastItem.children = [item];
            break;
          }

          lastItem = last(children); // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) {
            // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item);
            break;
          }
        }
      } else {
        // 置于最顶级
        items.push(item);
      }
    }

    return anchor;
  }

  reset = () => {
    this.tocItems = [];
    this.index = 0;
  };

  renderToc(items) {
    // 递归 render
    return items.map((item) => (
      <Link key={item.anchor} href={`#${item.anchor}`} title={item.text}>
        {item.children && this.renderToc(item.children)}
      </Link>
    ));
  }

  render() {
    return (
      <Anchor
        affix
        onClick={(e) => {
          e.preventDefault();
        }}
        style={{padding: 0}}
      >
        <Card size="small" headStyle={{ minHeight: 48 }} title="目录" style={{maxHeight: "100vh", overflow: "scroll"}}>
          {this.renderToc(this.tocItems)}
        </Card>
      </Anchor>
    );
  }
}
