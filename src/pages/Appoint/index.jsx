import Item from '../../components/Item';
//const Item = (()=>import('../../components/Item'));
import Head from "../../components/Head";
import'./index.less';
import React from 'react';
import { lazy,Suspense,useState,useEffect,useRef } from "react";
//import {GetClassByIdApi,GetSignupByIdApi,GetUnameApi,AddSignupApi,SignupDownApi} from '@/services/api';
let module =  import('@/services/api');
import {Button,message} from 'antd';
import moment from 'moment';
import Rr from '../../components/Rr';
const Appoint=(props)=>{
    const c_id = props.location.query.c_id;
    const isblack = props.location.query.isblack;
  const [newArr ,setnewArr] = useState(
    [{
      c_id: '',
      c_name: '',
      time: '',
      place: '',
      nm_money: '0.00',
      p_limit: 0,
      duration:0,
    }]
  );
const cname = useRef();

 const f = useRef(true);

 const p = useRef();

 const [user, setUser] = useState([]);
 const [appo,setappo] = useState(false);

  useEffect(()=>{
    if(isblack === 'true'){
      f.current = false;
    }
  },[isblack]);
//头部课程信息
const getClassById = async()=>{
  (await module).GetClassByIdApi({params:{
    c_id:c_id,
  }}).then((res)=>{
    const Arrr = res.data;
      setnewArr(res.data);
      cname.current = Arrr[0].c_name;
      let end_time = moment(Arrr[0].time).add(Arrr[0].duration,'m').format("YYYY-MM-DD HH:mm:ss");
      if(moment(end_time).isBefore(moment(),'minute')){
              f.current= false;
      }
  }).catch((err)=>{
    console.log(err);
  })
}
useEffect(()=>{
  getClassById();
},[]);
//显示预约人员并判断本人有没有预约
const getSignupById =async()=>{
  (await module). GetSignupByIdApi({
    params:{
      c_id:c_id
    }
  }).then((res)=>{
    setUser(res.data);
    res.data.forEach((item,i)=>{
      if(item.u_id == props.location.query.u_id){
        setappo(true);
      }
    });
  })
}
useEffect(()=>{
  getSignupById();
},[appoin]);
//返回
  const returnBefore = () =>{
    history.go(-1);
  }
//获取用户姓名
const getUname = async()=>{
  (await module). GetUnameApi({
    params:{
      u_id:props.location.query.u_id,
    }
  }).then((res)=>{
    p.current = res.data[0].u_name;
  })
}
useEffect(()=>{
  getUname();
},[]);
//预约按钮
const appoin =async()=>{
  (await module).AddSignupApi({
      id:props.location.query.u_id + c_id,
      c_id:c_id,
      c_name:cname.current,
      u_id:props.location.query.u_id,
      u_name:p.current,
      appo_time:moment().format("YYYY-MM-DD HH:mm:ss"),
    }
  ).then((res)=>{
    console.log(res);
    getSignupById();
  })
  //location.reload() ;
}
//用户取消预约课程
const deselect = async()=>{
  (await module).SignupDownApi({
    params:{
      u_id:props.location.query.u_id,
      c_id:c_id
    }
  }).then((res)=>{
    console.log(res);
    getSignupById();
    setappo(false);
  }).catch((err)=>{
    console.log(err);
  })
}
  const but =()=>{
      if(appo == true ){
        let time = moment(newArr[0].time).format("YYYY-MM-DD HH:mm:ss");
        if(moment(time).isBefore(moment(),"day")){
          
          message.error("请提前一天退选！")
        }else{
          deselect();
     
        }
        
      }else{
        appoin();
      }
  }
  return(
    <div className='g-appoint'>
      <div>
      <div className="m-return">
        <div  onClick={returnBefore}></div>
        <div>  <h2>课程详情</h2></div>
       
        </div>
          <Head data={newArr}></Head>
          <Rr newArr={newArr}> users = {user.length}</Rr>
          
      <div className="g-body">
          <div className="m-hd">
                <div><span>学员</span></div>
                <div><span>时间</span></div>
                <div><span>学费</span></div>
          </div>
          <div className="m-bd">
            {
              user?.map((item,i)=>(
                //<Suspense fallback={<div>Loding...</div>}>
                     <Item key={i} name={item.u_name} time={item.appo_time}  l={user.length} newArr={newArr}
                   c_id={c_id} c_id2={item.c_id} u_id={item.u_id} s = {1}></Item>
                //</Suspense>
                 
              ))
            }
          </div>
      </div>
      </div>
     
      <div className="u-bt">
            <Button className={f.current?(appo?"bt3":"bt1"):"bt2"}
              onClick={but }>{f.current?(appo?"退选":"预约"):'无权预约'}</Button>
      </div>
    </div>

  )
}
export default Appoint;