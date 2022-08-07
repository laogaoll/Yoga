import './index.less';
import yogaImg from "../images/yoga.svg";
import Head from '../components/Head';
import Drawer from '../components/Drawer';
import Logo from '../components/Logo';
import {Calendar} from'antd';
import React, { useEffect, useState } from 'react';
import type {Moment} from 'moment';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'umi';

/*const data = [
    {   
      name:"瑜伽",
      img:yogaImg,
      time:"2022-07-16 15:00-17:30",
      place:'勤21-101',
    }
  
  ]*/
 const timeChange = (time: any)=>{
    let newtime = moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
    return newtime;
 }

const IndexPage = (props:any) => {
  const [data2,setdata2] = useState([]);
  const[day,setday] = useState(String);
  let [isAdd, setIsAdd] = useState(false);
   const [buFlag,setbuFlag] = useState(true);
   const login = props.location.query.flag;
useEffect(()=>{
  axios.get('http://124.220.20.66:8000/api/user/course').then((response)=>{
    //console.log(response.data);
    setdata2(response.data);  
})
},[isAdd]);
 

  const dataCellRender = (value: Moment) =>{
    return ( data2.map((item: any,i: any)=>(
        value.format('YYYY-MM-DD') === timeChange(item.time).split(" ")[0]?(
          <Link className='u-img' key={i} to={`/AppointInfo?c_id=${item.c_id}`}>
          {item.c_name==='瑜伽'?<img src={yogaImg}></img>:""}
      </Link>
        ):null
    )))
      
    /*return value.format('YYYY-MM-DD') === data[0].time.split(' ')[0] ? 
      (<div className='u-img' onClick={()=>window.location.href="./AppointInfo"}>
        {data[0].name==='瑜伽'?<img src={yogaImg}></img>:""}
      </div>
    ):null*/
  };
  const onChange = (value: Moment) =>{
    if(value.isSame(moment(),"day") || value.isAfter(moment(),"day")){
        setbuFlag(true);
        setday(value.format('YYYY-MM-DD'));
        console.log(day);
    }else{
      setbuFlag(false);
    }
  }
   return (
      <div>
        <Head data={data2} flag={0}></Head>
        <div className='Calender'>
          <Logo></Logo>
          <Drawer flag = {buFlag} date={day} setIsAdd={setIsAdd} login={login}></Drawer>
          <Calendar dateCellRender={dataCellRender} onChange = {onChange}></Calendar>
        </div>
    </div>) ;
};

export default IndexPage;
