import React, { useState, memo, useMemo } from "react";

export default function TestUseMemo() {
  // useState是用来修改状态的 返回一个数组 第一个元素是状态 第二个元素是改变状态的方法
  const [count, setCount] = useState(0);
  const [name, setName] = useState("hjp");
  // useMemo是用来防止一些计算好的值，因为一些无关的渲染，又重新计算的钩子
  /*
  主要用于父组件的变量传递给子组件，因为父组件的重新render（使得传递的变量值也多次计算）,
  导致子组件也重新render,
  */
  /* 
  第一个参数是一个回调函数 第二个参数是依赖数组
  */
  /*
  useMemo和useCallback的区别
  1.useMemo是对回调函数的返回值进行优化
  2.useCallback是对回调函数进行优化

  说白了,useCallback就是对回调函数进行处理，而useMemo是对返回值进行处理
  useCallback可以被转换为useMemo，只需要把useMemo回调函数的返回值变成函数即可*/
  const addCount = useMemo(() => {
    return () => {
      console.log("addCount调用了");
      setCount(count + 1);
    };
  }, [count]);
  // 如果这么写 info会被多次定义或者说计算
  // const info = { name: "lqh", age: 20 }
  // 我们得在外面包多一个useMemo
  const info = useMemo(() => ({ name: "lqh", age: 20 }), []);
  return (
    <div>
      <h2>当前计数:{count}</h2>
      <h2>姓名:{name}</h2>
      <JPButton addCount={addCount} info={info} />
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
  return (
    <div>
      <h3>
        我是JPButton组件，接收到的信息是
        {`${props.info.name}---${props.info.age}`}
      </h3>
      <button onClick={props.addCount}>JPButton +1</button>
    </div>
  );
});
