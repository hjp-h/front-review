import React, { useState } from "react";

export default function TestUseState() {
  // useState是用来修改状态的 返回一个数组 第一个元素是状态 第二个元素是改变状态的方法
  const [count, setCount] = useState(0);
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
