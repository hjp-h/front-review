import {nanoid} from 'nanoid';
import {ADD_PERSON} from '../../common/constant'
const initialState = [{id:nanoid(),name:'kobe',age:42}];
const personReducer = (preState=initialState,action) => {
  // 从action中拿到type和data
  const {type,data} = action;
  switch (type) {
    case ADD_PERSON: 
      return [...preState,data];
    default:
      return preState;
  }
}
export default personReducer;
