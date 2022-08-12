import {Input,Button, message} from 'antd';
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import './index.less'
import { useHistory } from 'umi';
import React from 'react';
import { useState,useEffect ,useRef} from 'react';
import axios  from 'axios';
import moment from 'moment';

const reback =()=>{
    history.go(-1);
}

const Login =()=>{
    const [id,setId] = useState();
    const[password,setPassword] = useState();
    const[data,setData] = useState();
    const flag = useRef(false);

    const change1 = (event)=>{
        let d = event.target.value;
        setId(d);

    }
    const change2 =(e)=>{
        let p = e.target.value;
        setPassword(p);
    }
    const history = useHistory();
    useEffect(()=>{
        axios.get('http://124.220.20.66:8000/api/user/users').then((response)=>{
            setData(response.data);
        })
},[]);
   
    const login =()=>{
            data.forEach((val,i)=>{
            if(val.u_id == id && val.password == password ){
                flag.current = true;
                message.success("登录成功");
                localStorage.setItem('u_id',id);
                localStorage.setItem('u_name',val.u_name);
                localStorage.setItem('time', moment().format('YYYY-MM-DD HH:mm'));
                if(val.u_type == 1){
                    setTimeout(()=>history.push(`/?flag=1&u_id=${id}`),500);
                }else if(val.u_type == 0){
                    setTimeout(()=>history.push(`/?flag=2&u_id=${id}`),500);
                }
                
            }
        });
        if(flag.current == false){
            message.error("工号或者密码错误");
        }
    }
    return(  <div className='m-login'>
            <div>

                <Input size = "large"placeholder="工号"  prefix={<UserOutlined />} type="text" onChange={change1}></Input>
                <Input.Password size = "large"placeholder="密码" prefix={<LockOutlined />} type="text" onChange={change2}/>
                <Button className='u-bt1'size='large' onClick={login}>登录</Button>
                <Button className='u-bt2'size='large' onClick={reback}>取消</Button>
            </div>
        </div>
);
}
export default Login;