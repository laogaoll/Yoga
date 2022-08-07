import { DownOutlined ,UserOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React from 'react';
import { Link } from 'umi';
import './index.less';
const menu = (
  <Menu
    items={[
      {
        label: <Link to={"/Login"}>登录</Link>,
        key: '0',
      },
      {
        type: 'divider',
      },
      {
        label: <Link to={"/?flag=false"}>退出</Link>,
        key: '1',
      },
 
 
    ]}
  />
);

const Logo = () => (
  <Dropdown overlay={menu} trigger={['click']} className='m-logo'>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <UserOutlined />
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default Logo;