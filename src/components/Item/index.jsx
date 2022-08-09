import { Switch ,Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import React ,{ useState } from "react";
import moment from 'moment';
import { useEffect } from 'react';
import axios from 'axios';
const{confirm} = Modal;
const timeChange = (time)=>{
    let newtime = moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
    return newtime;
 }

const Item =(props)=>{
    const name = props.name;
    const u_id = props.u_id;
    const time = timeChange(props.time).split(' ')[0];
    const money = Number((props.newArr[0].nm_money)/(props.l>5?props.l:5)).toFixed(2);
    const duration = props.newArr[0].duration;
    const c_time =timeChange(props.newArr[0].time);
    const c_id = props.c_id;
    const c_id2 = props.c_id2;
    const [blackList,setblackList] = useState(false);
    const [dis, setDis] = useState(true);
    let end_time = moment(c_time).add(duration,'m').format("YYYY-MM-DD HH:mm:ss");
    useEffect(()=>{
        if(moment(end_time).isBefore(moment(),'s')){
            setDis(false);
         
        }
    },[]);
    useEffect(()=>{
        axios.get('http://124.220.20.66:8000/api/user/blacklist').then((response)=>{
            response.data.forEach((item,i) => {
                if(u_id == item.u_id){
                    setblackList(!blackList);
                }
            });
        })
      },[]);
     const showConfirm = (checked) => {
        confirm({
            title:`确认将${name}加入黑名单吗?`,
            icon:<ExclamationCircleOutlined/>,
            content:'',

            onOk(){
                setblackList(!blackList);
                axios.post('http://124.220.20.66:8000/api/user/blacklist',{
                    u_id:u_id,
                    u_name:name,
                    c_id:c_id2,
                    time:moment().format("YYYY-MM-DD HH:mm:ss")

                },{}).then((response)=>{console.log(response);})
            },
            onCancel(){
                console.log('Cancel');
            },
        });
      
   };
    return(
        c_id==c_id2?(
        <div className={time.split(' ')[0] ===c_time.split(' ')[0]? "color":(blackList?"c":"")}>
            <div>{name}</div>
            <div>{time}</div>
            <div>{money}</div>
            <div>
            <Switch disabled={dis||blackList} checked={blackList} onChange={showConfirm}></Switch>
            </div>
        </div>):null
    );
}
export default Item;