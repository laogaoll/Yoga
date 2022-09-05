import Head from "../../components/Head";
import'./index.less';
import React from 'react';
import { useState,useEffect,useRef } from "react";
import Item from '../../components/Item';
import Rr from '../../components/Rr';
//import { GetClassByIdApi,GetSignupByIdApi} from '@/services/api';
let module = import ('@/services/api');
const AppointInfo = (props) =>{
  const c_id = props.location.query.c_id;
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
 /* const newArr = useRef([]);*/
  const [user, setUser] = useState([]);

//详情页头部课程
const GetClassById = async()=>{
  (await module). GetClassByIdApi({params:{
    c_id:c_id,
  }}).then((res)=>{
    if(res.status === 1)
      setnewArr(res.data);
  }).catch((err)=>console.log(err));
};
useEffect(()=>{
  GetClassById();
},[]);
//预约人员
const getSignupById = async()=>{
  (await module). GetSignupByIdApi({
    params:{
      c_id:c_id,
    }
  }).then((res)=>{
    if(res.status === 1)
      setUser(res.data);
  })
}
useEffect(()=>{
  getSignupById();
},[]);

  const returnBefore = () =>{
    history.go(-1);
  }
  return(
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
                <div><span>未上课</span></div>
          </div>
          <div className="m-bd">
            {
              user?.map((item,i)=>(
                  <Item key={i} name={item.u_name} time={item.appo_time}  l={user.length} newArr={newArr}
                   c_id={c_id} c_id2={item.c_id} u_id={item.u_id} s={0}></Item>
              ))
            }
          </div>
      </div>
    </div>

  )
}

export default AppointInfo;