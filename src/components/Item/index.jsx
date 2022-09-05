import { Switch ,Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import React ,{ useState } from "react";
import moment from 'moment';
import { useEffect } from 'react';
import { useRef } from 'react';
let module = import('../../services/api');
moment.suppressDeprecationWarnings = true;
const{confirm} = Modal;
const timeChange = (time)=>{
    let newtime = moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
    return newtime;
 }

const Item =(props)=>{
    const s = props.s;
    const name = props.name;
    const u_id = props.u_id;
    const time = timeChange(props.time).split(' ')[0];
    const money = Number((props.newArr[0].nm_money)/(props.l>5?props.l:5)).toFixed(2);
    const duration = props.newArr[0].duration;
    const c_time =timeChange(props.newArr[0].time);
    const c_id = props.c_id;
    const c_id2 = props.c_id2;
    const [blackList,setblackList] = useState(false);

//是否在黑名单中
const getBlacklist = async()=>{
    (await module).GetBlacklistApi({
        params:{
            u_id:u_id,
            c_id:c_id,
        }
    }).then((res)=>{
        console.log(res.data);
        if(res.data){
            setblackList(!blackList);
        }
    }).catch((err)=>{
        console.log(err);
    })
}
useEffect(()=>{
    getBlacklist();
},[])
    /*useEffect(()=>{
        axios.get('http://124.220.20.66:8000/api/user/blacklist').then((response)=>{
            response.data.forEach((item,i) => {
                if(u_id == item.u_id && c_id == item.c_id){
                    setblackList(!blackList);
                }
            });
        })
      },[]);*/
//添加黑名单
const addBlacklist = async()=>{
    (await module).AddBlacklistApi({
        u_id:u_id,
        u_name:name,
        c_id:c_id2,
        time:moment().format("YYYY-MM-DD HH:mm:ss")
    }).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
}
     const showConfirm = (checked) => {
        confirm({
            title:`确认将${name}加入黑名单吗?`,
            icon:<ExclamationCircleOutlined/>,
            content:'',

            onOk(){
                setblackList(!blackList);
                addBlacklist();
            },
            onCancel(){
                console.log('Cancel');
            },
        });
      
   };
    return(
        <div className={time.split(' ')[0] ===c_time.split(' ')[0]? "color":(blackList?"c":"")}>
            <div>{name}</div>
            <div>{time}</div>
            <div>{money}</div>
            {s==1?null:<div><Switch disabled={blackList} checked={blackList} onChange={showConfirm}></Switch></div>}
        </div>
    );
}
export default Item;