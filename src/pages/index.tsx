import './index.less';
import yogaImg from "../images/yoga.svg";
import Head from '../components/Head';
import Drawer from '../components/Drawer';
import Logo from '../components/Logo';
import {Calendar} from'antd';
import React, { useEffect, useState ,useRef} from 'react';
import type {Moment} from 'moment';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'umi';
 const timeChange = (time: any)=>{
    let newtime = moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
    return newtime;
 }

const IndexPage = (props:any) => {
  const [data2,setdata2] = useState([]);
  const[day,setday] = useState(String);
  let [isAdd, setIsAdd] = useState(false);
   const [buFlag,setbuFlag] = useState(true);
   const [a,setA] = useState([
    {
      id:0,
      c_id:0,
      c_name:'',
      u_id:'',
      u_name:'',
      appo_time:'',
      cost:'',
    }
   ]) ;
   const count = useRef(0);
   const login = props.location.query.flag;
useEffect(()=>{
  axios.get('http://124.220.20.66:8000/api/user/course').then((response)=>{
    //console.log(response.data);
    setdata2(response.data);  
})
},[isAdd]);
useEffect(()=>{
  axios.get('http://124.220.20.66:8000/api/user/signup').then((response)=>{
      setA(response.data);
  })
},[]);
const num =(m: any)=>{
  count.current = 0;
  a.forEach((item,i)=>{
    if(item.c_id === m){
      count.current++;
    }
  })
  console.log(count.current)
  return count.current;
}
  const dataCellRender = (value: Moment) =>{
    return ( data2.map((item: any,i: any)=>(
        value.format('YYYY-MM-DD') === timeChange(item.time).split(" ")[0]?(
          <Link className='u-img' key={i} to={`/AppointInfo?c_id=${item.c_id}`}>
          {item.c_name==='瑜伽'?<img src={yogaImg}></img>:""}{num(item.c_id)}
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
