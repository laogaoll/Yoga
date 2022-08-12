import Item from '../../components/Item';
import Head from "../../components/Head";
import'./index.less';
import React from 'react';
import { useState,useEffect,useRef } from "react";
import {Button,message} from 'antd';
import axios from "axios";
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

  useEffect(()=>{
    axios.get('http://124.220.20.66:8000/api/user/course').then((response)=>{
    const Arrr = response.data.filter((item,index)=>{
            return item.c_id == c_id;
    })  
    cname.current = Arrr[0].c_name;
    let end_time = moment(Arrr[0].time).add(Arrr[0].duration,'m').format("YYYY-MM-DD HH:mm:ss");
    if(moment(end_time).isBefore(moment(),'minute')){
            f.current= false;
    }
    setnewArr(Arrr);
  })
  },[]);

  useEffect(()=>{
    axios.get('http://124.220.20.66:8000/api/user/signumber',{
      params:{
        c_id:c_id,
      }
    }).then((response)=>{
          setUser(response.data);
          response.data.forEach((item,i) => {
            if(item.u_id == props.location.query.u_id){
              setappo(true);
            }
          });
    })
  },[appoin])
console.log(appo);
  const returnBefore = () =>{
    history.go(-1);
  }
 useEffect(()=>{
  axios.get('http://124.220.20.66:8000/api/user/getname',{
      params:{
        u_id:props.location.query.u_id,
      }
    }).then((response)=>{
      p.current = response.data[0].u_name;
    })
 },[]);
  const appoin =()=>{
    axios.post('http://124.220.20.66:8000/api/user/addsignup',{
      id:props.location.query.u_id + c_id,
      c_id:c_id,
      c_name:cname.current,
      u_id:props.location.query.u_id,
      u_name:p.current,
      appo_time:moment().format("YYYY-MM-DD HH:mm:ss"),
    }).then((response)=>{
      console.log(response);
    })
    location.reload() ;
  }
  const deselect =()=>{
      axios.delete('http://124.220.20.66:8000/api/user/signdown',{
        params:{
          u_id:props.location.query.u_id,
          c_id:c_id,
        }
      }).then((response)=>{
          console.log(response);
      })
      location.reload() ;
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
                <div><span>未上课</span></div>
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
                  <Item key={i} name={item.u_name} time={item.appo_time}  l={user.length} newArr={newArr}
                   c_id={c_id} c_id2={item.c_id} u_id={item.u_id} s = {1}></Item>
              ))
            }
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