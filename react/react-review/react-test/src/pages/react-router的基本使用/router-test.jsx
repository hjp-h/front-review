import React from "react";
import { NavLink, withRouter } from "react-router-dom";
// import Counter from "../redux的基本使用/counter";
// import Person from "../redux的基本使用/person";
function RouterTest(props) {
  const toCounter = () => {
    console.log(props);
    props.history.push("/counter?id=1&name=hjp");
  };
  const toPerson = () => {
    props.history.push({
      pathname: "/person",
      state: { id: 1, name: "curry", age: 12 },
    });
  };
  return (
    <div>
      <h2>我是router测试组件</h2>
      {/* 编写路由链接 */}
      {/* params参数携带 */}
      {/* <NavLink to={`/counter/1/hjp`} activeStyle={{ color: "green" }}>
        counter
      </NavLink> */}
      {/* query方式携带参数 */}
      <NavLink to={`/counter?id=1&name=hjp`} activeStyle={{ color: "green" }}>
        counter
      </NavLink>
      {/* state（参数放在一个叫state的对象中）方式 */}
      {/* <NavLink
        to={{ pathname: `/counter`, state: { id: 1, name: "hjp" } }}
        activeStyle={{ color: "green" }}
      > 
        counter
      </NavLink> */}
      &nbsp;&nbsp;
      <NavLink to="/person" activeStyle={{ color: "yellow" }}>
        person
      </NavLink>
      <button onClick={toCounter}>跳转counter</button>
      <button onClick={toPerson}>跳转person</button>
      {/* 注册路由 注册路由也可以在App.js里面写*/}
      {/* <div style={{ backgroundColor: "skyblue" }}> */}
      {/* <Switch> */}
      {/* params方式注册counter路由 */}
      {/* <Route path="/counter/:id/:name" component={Counter} /> */}
      {/* query,state方式注册counter路由 */}
      {/* <Route path="/counter" component={Counter} />
          <Route path="/person" component={Person} />
          <Redirect to="/counter" />
        </Switch>
      </div> */}
    </div>
  );
}
export default withRouter(RouterTest);
