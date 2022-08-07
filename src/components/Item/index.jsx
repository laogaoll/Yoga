import { Switch } from 'antd';
import React ,{ useState } from "react";
import moment from 'moment';
import { useEffect } from 'react';
const timeChange = (time)=>{
    let newtime = moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
    return newtime;
 }

const Item =(props)=>{
    const name = props.name;
    const time = timeChange(props.time);
    const money = props.money;
    const duration = props.duration;
    const c_time =timeChange(props.c_time);
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
     const onChange = (checked) => {

      setblackList(checked);
   };
    return(
        c_id==c_id2?(
        <div className={time.split(' ')[0] ===c_time.split(' ')[0]? "color":(blackList?"c":"")}>
            <div>{name}</div>
            <div>{time}</div>
            <div>{money}</div>
            <div>
            <Switch disabled={dis} defaultChecked={0} onChange={onChange}></Switch>
            </div>
        </div>):null
    );
}
export default Item;