import { PlusOutlined } from '@ant-design/icons';
import {Slider,message,InputNumber, Button,Radio, Col, TimePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import './index.less';
import axios from 'axios';
import {addCourseApi} from '@/services/api';
const { Option } = Select;

const format = 'HH:mm';
const markes = {
  60:'60',
  90:'90',
  120:'120',
  150:'150',
}
const App = ( props) => {
  const flag = props.flag;
  const date = props.date;
  const setIsAdd = props.setIsAdd;
  const login = props.login;
  const [data,setdata] = useState();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(1);
console.log(login==="true");
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const showDrawer = () => {
    flag?setVisible(true):null;
  };

  const onClose = () => {
    setVisible(false);
  };
const changeNumber = (n,add,step,min,max)=>{
  let {[n]:before} = form.getFieldValue();
  let newValue = add?before+step : before-step;
  if(newValue > max || newValue < min){
      message.error('不合法取值');
      return;
  }
  form.setFieldsValue({[(()=>n)()]:newValue})
  updateNa_money();
}
const updateNa_money = () => {
  let { nm_money, p_limit } = form.getFieldsValue();
  let na_money =  ((nm_money / p_limit) * 1.5).toFixed(2) ;
  return na_money;
}
const addIcon1 = (
  <div onClick={() => (changeNumber('nm_money', true, 10, 300, 500))}>+</div>);
const reduceIcon1 = (
  <div onClick={() => (changeNumber('nm_money', false, 10, 300, 500))}>-</div>)
const addIcon2 = (
  <div onClick={() => (changeNumber('p_limit', true, 1, 5, 12))}>+</div>);
const reduceIcon2 = (
  <div onClick={() => (changeNumber('p_limit', false, 1, 5, 12))}>-</div>)

//添加课程
const addCourse = async() =>{
  let c_id = moment().format('YYYYMMDDHHmmss')
  let c_name = form.getFieldValue('c_name');
  let time =date+" "+moment( form.getFieldValue('begin_time')).format("HH:mm:ss");
  let place = form.getFieldValue('place');
  let nm_money = form.getFieldValue('nm_money');
  let duration = form.getFieldValue('time_step');
  let p_limit = form.getFieldValue('p_limit');
  await addCourseApi({
    c_id:c_id,
    c_name:c_name,
    time:time,
    place:place,
    nm_money:nm_money,
    duration:duration,
    p_limit:p_limit,
  }).then((res)=>{
    console.log(res);
    setIsAdd(true);
    setVisible(false);
  }).catch((err)=>{
    console.log(err);
  })
}
  return (
    
    <>
      <div className="g-index">
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} className={login==="1"?(flag?" u-button":'cannotadd'):'bt'}>
        添加课程
      </Button>
      <Drawer
        title="添加新课程"
        width={417}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          //paddingBottom: 80,
        }}
        extra={
          <div onClick={()=>onClose()}>

          </div>
        }
       >
        <Form layout='vertical'
          form = {form}
          hideRequiredMark
          initialValues={{
            'c_name' : '瑜伽',
            'place':'师生活动中心2-108',
            'nm_money':400,
            'na_money':60.00,
            'p_limit':10,
              'time_step':90,
            "begin_time":moment('17:00',format),
          }}>
            <Col span={24}>
              <Form.Item 
                name="c_name"
                label="课程"
                rules={[{required:true}]}>
                     <Radio.Group onChange={onChange} value={value} className="m-radio">
                    <Radio.Button value='瑜伽'>瑜伽</Radio.Button>
                    <Radio.Button value='围棋'>围棋</Radio.Button>
                    <Radio.Button value='羽毛球'>羽毛球</Radio.Button>
                </Radio.Group>
                </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="上课时间"
                name="begin_time">
                    <TimePicker  format={format} minuteStep={30}
                 showNow={false} inputReadOnly></TimePicker>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="time_step"
                label = "时长(分)"
                >
                  <Slider min={60} max={150}  marks={markes} step={null}/>
                </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='place'
                label='地点'
                rules={[{required: true,message:"请输入上课地点"}]}>
                     <Input placeholder="请输入上课地点" />

                </Form.Item>
            </Col>
            
              <Col span={24}>
                <Form.Item
                  name="nm_money"
                  label="普通金额(300￥ ~ 500￥)"
                  rules={[{required:true,message:"请输入普通金额"}]}>
                         <InputNumber  min={300} max={500} addonBefore={reduceIcon1} addonAfter={addIcon1} readOnly/>
                  </Form.Item>
              </Col>
              <Col span={24}>
              <Form.Item
                name="p_limit"
                label="人数(5~12)"
                rules={[{required:true,message:"请输入课程人数"}]}>
                   <InputNumber min={5} max={12} addonBefore={reduceIcon2} addonAfter={addIcon2}></InputNumber>
                </Form.Item>
              </Col>
        </Form>
                  <div className='u-btt'>
                      <Button onClick={()=>addCourse()}>提交</Button>
                        <Button onClick={()=>onClose()}>取消</Button>
                 </div>
                        
      </Drawer>
      </div>
    </>
  );
};

export default App;