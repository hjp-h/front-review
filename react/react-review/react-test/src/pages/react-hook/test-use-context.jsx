import React, { useState, createContext, useContext } from "react";
const MyContext = createContext();
const { Provider, Consumer } = MyContext;
export default function TestUseContext() {
  // 创建context
  const [info, setInfo] = useState({ name: "hjp", age: 21 });
  const { name, age } = info;
  return (
    <div>
      <h2>我是父组件：{`${name} --- ${age}`}</h2>
      <button
        onClick={() => {
          setInfo({ name: "lqh", age: 20 });
        }}
      >
        修改信息
      </button>
      <Provider value={info}>
        <Son />
      </Provider>
    </div>
  );
}
// 子组件
const Son = () => {
  // 在子组件中使用useContext可以拿到父组件传过来的所有信息
  // 可以使用useContext 也可以使用Consumer组件
  const info = useContext(MyContext);
  info.name = "ms";
  info.age = 3;
  console.log(info);
  return (
    <div>
      <h3>我是子组件</h3>
      <Consumer>
        {/* 这里的value 受上面的info影响 */}
        {(value) => `我接收到的信息：${value.name}---${value.age}`}
      </Consumer>
    </div>
  );
};
