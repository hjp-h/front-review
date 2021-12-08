import React, { useReducer } from "react";

// 1.定义reducer纯函数
const countReducer = (initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case "increment":
      return initialState + data;
    case "decrement":
      return initialState - data;
    default:
      return initialState;
  }
};
export default function TestUseReducer() {
  // useReducer是useState的一种替代方案，不能共享数据，不能取代redux
  // 在某些情况下 如果useState的处理逻辑比较复杂，可以使用useReducer对其进行拆分
  // useReducer的使用
  /*
   参数：1.reducer纯函数  2.初始值
   返回值：是一个数组，包含了状态+dispatch函数
  */
  const [count, dispatch] = useReducer(countReducer, 0);
  return (
    <div>
      <h2>当前计数:{count}</h2>
      <button
        onClick={() => {
          dispatch({ type: "increment", data: 1 });
        }}
      >
        加1
      </button>
      <button
        onClick={() => {
          dispatch({ type: "decrement", data: 1 });
        }}
      >
        减一
      </button>
    </div>
  );
}
