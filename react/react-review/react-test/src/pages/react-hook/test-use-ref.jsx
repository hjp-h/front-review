import React, { useState, useRef } from "react";

export default function TestUseRef() {
  // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
  // 返回的 ref 对象在组件的整个生命周期内保持不变。
  const [count, setCount] = useState(0);
  const inputRef = useRef(123);
  return (
    <div>
      <h2>当前计数:{count}</h2>
      <input ref={inputRef} placeholder="请输入数字" type="number" />
      <button
        onClick={() => {
          const data = inputRef.current.value * 1;
          setCount(count + data);
        }}
      >
        加法
      </button>
      <button
        onClick={() => {
          const data = inputRef.current.value * 1;
          setCount(count - data);
        }}
      >
        减法
      </button>
    </div>
  );
}
