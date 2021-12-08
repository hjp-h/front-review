import {getSwiperData} from '../../../../service/home';
const getSwiperAction = () => {
  return dispatch => {
    // 异步请求
    getSwiperData().then(res => {
      console.log('getSwiperData',res.message);
      dispatch({type:'getSwiperAction', data: res.message});
    })
  }
}
export {
  getSwiperAction
}
