import {
  useReducer
} from "react";
const countReducer = function(state, action) {
  const num = parseInt(action.data);
  switch (action.type){
    case 'add':
      return state+num;
    case 'sub':
      return state-num;
    default:
      return state;
  }
} 
export default function Test() {
  console.log(222)
  const [count, dispatch] = useReducer(countReducer,0);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch({type: 'add',data:1})}>点我加1</button>
      <button onClick={() => dispatch({type: 'sub',data:1})}>点我减1</button>
    </div>
  );
}
