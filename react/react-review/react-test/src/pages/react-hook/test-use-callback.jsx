import React, { useState, useCallback, memo } from "react";

export default function TestUseCallback() {
  // useState是用来修改状态的 返回一个数组 第一个元素是状态 第二个元素是改变状态的方法
  const [count, setCount] = useState(0);
  const [name, setName] = useState("hjp");
  // useCallback是用来限制函数重新定义的次数，一般会传递一个依赖数组来控制
  /*
  主要用于父组件的函数传递给子组件，因为父组件的重新render（使得传递的函数也多次定义）,
  导致子组件也重新render,
  */
  /*
  第一个参数是一个回调函数 第二个参数是依赖数组
  */
  const addCount = useCallback(() => {
    console.log("addCount调用了");
    // 下面这种写法可以使得函数功能恢复正常
    // setCount((count) => count + 1);
    setCount(count + 1);
  }, [count]);
  return (
    <div>
      <h2>当前计数:{count}</h2>
      <h2>姓名:{name}</h2>
      <JPButton addCount={addCount} />
      <button
        onClick={() => {
          setName("lqh");
        }}
      >
        换名
      </button>
    </div>
  );
}
const JPButton = memo((props) => {
  console.log("JPButton render");
  return <button onClick={props.addCount}>JPButton +1</button>;
});
