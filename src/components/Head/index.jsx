import lessStyles from './index.less';
import yogaImg from '../../images/yoga.svg';
import yumaoImg from '../../images/yumaoqiu.jpg';
import weiqiImg from '../../images/weiqi.svg';
import moment from 'moment';

const timeChange = (time)=>{
    let newtime = moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
    return newtime;
 }

const Head = (props)=>{
    const data = props.data;
    const flag = props.flag;
    return(
        <div>{
            flag === 0?
            (data?.map((item,i)=>(
               moment( timeChange(item.time).split(' ')[0]).isSame(moment(),"day")?(
                <div key={i} className={lessStyles.head}>
                     <img src={yogaImg} alt="" />
                     <div>
                        <span>{timeChange(item.time)}</span>
                        <span>{item.duration}分钟</span>
                        <span>{item.place}</span>
                     </div>
                </div>):null
               

            ))):(data?.map((item,i)=>(
               
                 <div key={i} className={lessStyles.head}>
                      <img src={yogaImg} alt="" />
                      <div>
                         <span>{timeChange(item.time)}</span>
                         <span>{item.duration}分钟</span>
                         <span>{item.place}</span>
                      </div>
                 </div>
                
 
             )))
             }
        </div>
    )
}
export default Head;

