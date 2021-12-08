import React, { useState, useEffect } from "react";

export default function TestUseEffect() {
  // useState是用来修改状态的 返回一个数组 第一个元素是状态 第二个元素是改变状态的方法
  const [count, setCount] = useState(0);
  // useEffect是一个生命周期函数的钩子（一定会调用一次componentDidMount）
  // 1.概括的说是三个生命周期函数的钩子 componentDidMount componentDidUpdate componentWillUnmount
  // 2.它接收两个参数，第一个是一个回调函数，第二个是依赖数组（可选）
  // 3.其中回调函数中返回的那个函数就是componentWillUnmount
  // 4.而回调函数能否是componentDidUpdate，取决于依赖数组
  // (1)没有传依赖数组的话，就是谁都监听，就是componentDidUpdate
  // (2)传空数组的话，就是谁也不监听，只是componentDidMount
  // (3)依赖数组非空的话，只监听依赖数组中的元素，其中的元素变化才update

  // 注意：依赖的改变会导致函数重新render,也就是说，在重新render前，都会调用useeffect
  //       回调函数返回的那个函数，因此，要想在组件真正意义彻底销毁时调用，得写多个
  //       useEffect  ！！！

  // 会随着count的更新 而触发仅限于这个useeffect的生命周期钩子
  useEffect(() => {
    console.log("useEffect", count);
    return () => {
      console.log("依赖count的TestUseEffect卸载了");
    };
  }, [count]);

  // 传空数组 只会监听一次componentDidUpdate componentWillUnmount
  useEffect(() => {
    console.log("TestUseEffect mounted,空数组依赖");
    return () => {
      console.log("空数组TestUseEffect unmounted");
    };
  }, []);

  // 什么也没传 只要state更新 这个钩子就被调用
  useEffect(() => {
    console.log("没有传递依赖数组的useEffect");
    return () => {
      console.log("没有传递依赖数组的TestUseEffect unmount");
    };
  });
  return (
    <div>
      <h2>当前计数:{count}</h2>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        加1
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        减一
      </button>
    </div>
  );
}
