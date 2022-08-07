

const Rr =(props)=>{
    const newArr = props.newArr;
    const users = props.users;
    const Countna_money = (nm_money) => {

        let na_money =  ((Number(nm_money) / (users> 5 ? users : 5)) * 1.5).toFixed(2) ;
        return na_money;
      }
    return(
        <div>
            {newArr?.map((item,i)=>(
                <div className="m-head" key={i}>
                    <div><span>普通金额：{(Number(item.nm_money) / (users> 5 ? users : 5)).toFixed(2)}</span></div>
                    <div><span>非预约金额：{Countna_money(item.nm_money)}</span></div>
                    <div><span>人数：{item.p_limit}</span></div>
                </div>
            ))}
        </div>
    )
}
export default Rr;