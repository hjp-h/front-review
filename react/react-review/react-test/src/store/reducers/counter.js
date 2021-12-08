import {INCREMENT,DECREMENT} from '../../common/constant'
// reducer是一个函数
const countReducer = (preState=0,action) => {
  // 从action中取出type,data
  const {type,data} = action;
  switch(type){
    case INCREMENT:
      return preState+data;
    case DECREMENT:
      return preState-data;
    default:
      return preState;
  }
}
// 导出reducer
export default countReducer;
