import lessStyles from './index.less';
import yogaImg from '../../images/yoga.svg';
import yumaoImg from '../../images/yumaoqiu.jpg';
import weiqiImg from '../../images/weiqi.svg';
import moment from 'moment';
//去除RFC2822/ISO date formats的警告
moment.suppressDeprecationWarnings = true;
const timeChange = (time)=>{
    let newtime = moment(time).format('YYYY-MM-DD HH:mm:ss');
    return newtime;
 }

const Head = (props)=>{
    const data = props.data;
    const flag = props.flag;
    return(
        <div>{
            (data?.map((item,i)=>(
                <div key={i} className={lessStyles.head}>
                     {item.c_name=="瑜伽"?<img src={yogaImg} alt="" />:(item.c_name=="围棋"?<img src={weiqiImg}/>:<img src={yumaoImg}/>)}
                     <div>
                        <span>{timeChange(item.time)}</span>
                        <span>{item.duration}分钟</span>
                        <span>{item.place}</span>
                     </div>
                </div>)
               

            ))
             }
        </div>
    )
}
export default Head;

