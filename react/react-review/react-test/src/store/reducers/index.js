import countReducer from './counter';
import personReducer from './person';
import {reducer as swiperReducer}  from '../../pages/redux的基本使用/swiper/store';
import { combineReducers } from 'redux';
// 存在多个reducer时，要用combinedReducers
// combineReducers里面的对象长啥样 到时候取数据的时候就啥样 state.count
export default combineReducers({
  count:countReducer,
  person:personReducer,
  swiper: swiperReducer
})
