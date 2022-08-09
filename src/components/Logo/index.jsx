import { DownOutlined ,UserOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space ,Modal} from 'antd';
import React from 'react';
import { Link ,useHistory} from 'umi';
import './index.less';
//<Link to={"/?flag=false"}>退出</Link>,

const {confirm} = Modal;


const Logo = () => {
  const history = useHistory();
  const showConfirm=()=>{
    confirm({
      title:'确认退出登录吗？',
      icon:<ExclamationCircleOutlined></ExclamationCircleOutlined> ,
      content:"",
      onOk(){
          history.push('/?flag=false');
      },
      onCancel(){
        console.log('Cancel');
      }
    })
  }
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
          label: <div onClick={showConfirm}>退出</div>,
          key: '1',
        },
   
   
      ]}
    />
  );
  return(
    <Dropdown overlay={menu} trigger={['click']} className='m-logo'>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <UserOutlined />
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
  )
 
};

export default Logo;