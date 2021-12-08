import React, { useRef, useEffect } from "react";
// 使用connect 让视图和store连接
import { connect } from "react-redux";
import qs from "querystring";
import Detail from "./c-pages/detail";
// 引入counter相关的action
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../store/actions/counter";
import { NavLink,Switch,Route} from "react-router-dom";
import { renderRoutes } from "react-router-config";
function Counter(props) {
  const selectRef = useRef();
  const increment = () => {
    const value = selectRef.current.value;
    console.log(value);
    // 调用mapDispatchToProps的方法
    props.increment(value * 1);
  };
  const decrement = () => {
    const value = selectRef.current.value;
    console.log(value);
    props.decrement(value * 1);
  };
  const asyncIncrement = () => {
    const value = selectRef.current.value;
    console.log(value);
    props.asyncIncrement(value * 1, 1000);
  };
  useEffect(() => {
    // params方式接受路由参数 props.match.params
    // const {
    //   match: { params },
    // } = props;
    // console.log("counter组件", params.id, params.name);

    // query方式接受 props.location.search (?id=1&name='hjp')
    if(props.location && props.location.search){
      const search = props.location.search.slice(1);
      const queryData = qs.parse(search);
      console.log("counter组件", queryData);
    }
    
    // state方式接受 props.location.state || {};
    // const { id, name } = props.location.state || {};
    // console.log("counter组件", id, name);

    // renderRoutes跳转到的路由 有props.route属性 可以拿到routes
    console.log("当前路径", props);
  }, [props]);
  return (
    <div>
      <h2>我是counter组件，下方person组件人数为：{props.person.length}</h2>
      <h2>当前求和为：{props.count}</h2>
      <select ref={selectRef}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={asyncIncrement}>异步加</button>
      <NavLink to="/counter/detail">计算详细</NavLink>
      {/* <Switch>
        <Route path="/counter/detail" component={Detail}></Route>
      </Switch> */}
      {props.route && props.route.routes && renderRoutes(props.route.routes)}
    </div>
  );
}
const mapStateToProps = (state) => ({
  count: state.count,
  person: state.person,
});
const mapDispatchToProps = (dispatch) => ({
  increment: (data) => dispatch(createIncrementAction(data)),
  decrement: (data) => dispatch(createDecrementAction(data)),
  asyncIncrement: (data, delay) =>
    dispatch(createIncrementAsyncAction(data, delay)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
