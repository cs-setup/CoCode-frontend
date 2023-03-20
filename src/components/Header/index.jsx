import React from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';

const items = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
  },
];

export default function Header(props) {
  const onClick = () => {
    alert(111)
  }

  return (
    <>
        <Menu onClick={onClick} selectedKeys={[]} mode="horizontal" items={items} />
    </>
  )
}
