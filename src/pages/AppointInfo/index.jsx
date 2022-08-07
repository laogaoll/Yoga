import Head from "../../components/Head";
import'./index.less';
import React from 'react';
import { useState,useEffect } from "react";
import Item from '../../components/Item';
import axios from "axios";
import Rr from '../../components/Rr';


/*const Countna_money = (nm_money,p_limit) => {

  let na_money =  ((nm_money / p_limit) * 1.5).toFixed(2) ;
  return na_money;
}*/

const AppointInfo = (props) =>{
  const c_id = props.location.query.c_id;
  const [newArr ,setnewArr] = useState([]);
  const [Arr,setArr] = useState([])
  const [user, setUser] = useState([]);
  useEffect(()=>{
    axios.get('http://124.220.20.66:8000/api/user/course').then((response)=>{
    const Arr = response.data.filter((item,index)=>{
            return item.c_id == c_id;
    })  
    setArr(response.data);
    setnewArr(Arr);
  
  })
  },[]);

  useEffect(()=>{
    axios.get('http://124.220.20.66:8000/api/user/signup').then((response)=>{
    
    setUser(response.data);

  })
  },[])

  const returnBefore = () =>{
    history.go(-1);
  }
  return(
    <div>
      <div className="m-return">
        <div  onClick={returnBefore}></div>
        <div>  <h2>课程详情</h2></div>
       
        </div>
      <Head data={newArr} flag={1}></Head>
        <Rr newArr={newArr}> users = {user.length}</Rr>
      <div className="g-body">
          <div className="m-hd">
                <div><span>学员</span></div>
                <div><span>时间</span></div>
                <div><span>学费</span></div>
                <div><span>黑名单</span></div>
          </div>
          <div className="m-bd">
            {
              user?.map((item,i)=>(
                /*<div id='row'i={i} key={i}className={item.time.split(' ')[0] ===course[0].time.split(' ')[0]? "color":(blackList?"c":"")}>
                    <div><span>{item.user_name}</span></div>
                    <div><span>{item.time}</span></div>
                    <div><span>{item.money}</span></div>
                    <div><Switch defaultChecked = {0} onChange={(e)=>onChange(e,i)} /></div>
                </div>*/
                  <Item key={i} name={item.u_name} time={item.appo_time} money={(Number(newArr[0].nm_money) / (user.length> 5 ? user.length: 5)).toFixed(2)} 
                  c_time={newArr[0].time} duration={newArr[0].duration} c_id={c_id} c_id2={item.c_id}></Item>
              ))
            }
          </div>
      </div>
    </div>

  )
}

export default AppointInfo;