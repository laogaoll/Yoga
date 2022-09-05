import './index.less';
import yogaImg from "../images/yoga.svg";
import weiqiImg from "../images/weiqi.svg";
import yumaoqiuImg from "../images/yumaoqiu.jpg";
//import Head from '../components/Head';
const Head = lazy(()=>import('../components/Head'));
//import Drawer from '../components/Drawer';
const Drawer = lazy(()=>import('../components/Drawer'));
//import Logo from '../components/Logo';
const Logo = lazy(()=>import('../components/Logo'));
import {Calendar} from'antd';
import React,{lazy,Suspense, useEffect, useState ,useRef} from 'react';
//import { GetClassApi,GetDayClassApi,GetSignupApi, GetIsblackApi} from '@/services/api';
import type {Moment} from 'moment';
import moment from 'moment';
import { Link } from 'umi';

 const timeChange = (time: any)=>{
    let newtime = moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
    return newtime;
 }
const IndexPage = (props:any) => {
  const [data2,setdata2] = useState([]);
  const [da,setda] = useState([]);
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
   const id = props.location.query.u_id;

   const [isblack,setB] = useState(false);
   if (
    moment().diff(
      moment(localStorage.getItem('time'), 'YYYY-MM-DD HH:mm'),
      'minutes',
    ) > 30
  ) {
    localStorage.removeItem('u_id');
    localStorage.removeItem('u_name');
    localStorage.removeItem('time');
  }
//头部显示今日课程信息
let module =  import ('@/services/api');
const getDayClass = async(day:any)=>{
 /* await GetDayClassApi({params:{Today:day}}).then((res)=>{
    if(res.status === 1)
      setdata2(res.data);
  }).catch((err)=>console.log(err));*/
   (await module).GetDayClassApi({params:{Today:day}}).then((res)=>{
    if(res.status === 1)
      setdata2(res.data);
  }).catch((err)=>console.log(err));

};
useEffect(()=>{
  getDayClass(moment().format('YYYY-MM-DD'));
},[isAdd]);
//日历课程动态监听
const getClass = async ()=>{
 /* await GetClassApi().then((res)=>{
    if(res.status === 1)
      setda(res.data);
    
  })
  .catch((err)=>console.log(err));*/
  (await module).GetClassApi().then((res)=>{
    if(res.status === 1)
      setda(res.data);
  })
 }
useEffect(()=>{
  getClass();
},[isAdd])
//获取预约人数
const getSignup = async()=>{
  /*await GetSignupApi().then((res)=>{
    if(res.status === 1)
      setA(res.data);
  })
  .catch((err)=>console.log(err));*/
  (await module).GetSignupApi().then((res)=>{
    if(res.status === 1)
      setA(res.data);
  })
}
useEffect(()=>{
  getSignup();
},[]);
//判断是否两次未上课
const getIsblack = async() =>{
  /*await GetIsblackApi({
    params:{
      u_id:id,
    }
  }).then((res)=>{
    console.log(res.data);
    if(res.data){
      setB(true);
    }
  })*/
  (await module).GetIsblackApi({
    params:{
      u_id:id
    }
  }).then((res)=>{
      if(res.data){
        setB(true);
      }
  })
}

useEffect(()=>{
  getIsblack();
},[id]);
const num =(m: any)=>{
  count.current = 0;
  a.forEach((item,i)=>{
    if(item.c_id === m){
      count.current++;
    }
  })
  return count.current;
}
  const dataCellRender = (value: Moment) =>{
    return ( da.map((item: any,i: any)=>(
        value.format('YYYY-MM-DD') === timeChange(item.time).split(" ")[0]?(
          <Link className='u-img' key={i} to={login==1?`/AppointInfo?c_id=${item.c_id}`:(login==2?`/Appoint?c_id=${item.c_id}&isblack=${isblack}&u_id=${id}`:'/login')}>
          {item.c_name==='瑜伽'?<img src={yogaImg}></img>:(item.c_name==='围棋'?<img src={weiqiImg}></img>:(
            item.c_name==="羽毛球"?<img src={yumaoqiuImg}></img>:""))}{num(item.c_id)}
      </Link>
        ):null
    )))
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
      <div className='g-init'>
        <Suspense fallback={<div>Loding...</div>}>
          <Head data={data2}></Head>
        </Suspense>
       
        <div className='Calender'>
          <Suspense fallback={<div>Loding...</div>}>
            <Logo login = {login}></Logo>
            <Drawer flag = {buFlag} date={day} setIsAdd={setIsAdd} login={login}></Drawer>
          </Suspense>
          <Calendar dateCellRender={dataCellRender} onChange = {onChange}></Calendar>
        </div>
    </div>) ;
};

export default IndexPage;
