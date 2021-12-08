import {INCREMENT,DECREMENT} from '../../common/constant';
// 创建action就是返回一个对象，包含type,data
export const createIncrementAction = data => ({type:INCREMENT,data});
export const createDecrementAction = data => ({type:DECREMENT,data});
// 异步action
export const createIncrementAsyncAction = (data,delay) => {
  // 执行一些异步的操作 再去发送我们的action(例如网络请求)
  return dispatch => {
    setTimeout( () => {
      dispatch(createIncrementAction(data));
    },delay); 
  }
}
