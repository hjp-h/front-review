import React, { createContext, useContext } from "react";

const userContext = createContext();
const tokenContext = createContext();
export default function TestCustomerHook() {
  // 自定义hook就是将一些公共的逻辑抽取出来 封装在一个函数里面
  // 但是这个函数得用use开头命名
  return (
    <div>
      <h2>我是父组件</h2>
      <userContext.Provider value={{ name: "hjp", age: 21 }}>
        <tokenContext.Provider value="sdwef1354asdfs5d5f5">
          <Son />
        </tokenContext.Provider>
      </userContext.Provider>
    </div>
  );
}
function Son() {
  const [user, token] = useShareContext();
  return (
    <div>
      <h3>
        我是儿子组件，接收到的信息：{user.name}--{user.age}---token-{token}
      </h3>
    </div>
  );
}
function useShareContext() {
  const user = useContext(userContext);
  const token = useContext(tokenContext);
  return [user, token];
}
