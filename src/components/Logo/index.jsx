import {  UserOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import { Modal} from 'antd';
import React from 'react';
import { Link ,useHistory} from 'umi';
import './index.less';
//<Link to={"/?flag=false"}>退出</Link>,

const {confirm} = Modal;


const Logo = (props) => {
  const history = useHistory();
  const login = props.login;

  const Login = () =>{
      history.push('/Login');
  }
  const showConfirm=()=>{
    confirm({
      title:'确认退出登录吗？',
      icon:<ExclamationCircleOutlined></ExclamationCircleOutlined> ,
      content:"",
      onOk(){
          history.push('/?flag=0');
      },
      onCancel(){
        console.log('Cancel');
      }
    })
  }

  return(
    <div className='m-logo'>
 
        <UserOutlined onClick={login==0?Login:showConfirm}/>
  
    </div>

  )
 
};

export default Logo;