// import {renderRoutes} from 'react-router-config';
import { useState } from "react";
import { withRouter } from "react-router-dom";
// import routes from './router';
// import RouterTest from './pages/react-router的基本使用/router-test';
// import Counter from "./pages/redux的基本使用/counter";
// import Person from "./pages/redux的基本使用/person";
// import TestUseState from "./pages/react-hook/test-use-state";
// import TestUseRef from "./pages/react-hook/test-use-ref";
// import TestUseEffect from "./pages/react-hook/test-use-effect";
// import TestUseReducer from "./pages/react-hook/test-use-reducer";
// import TestUseLayoutEffect from "./pages/react-hook/test-use-layout-effect ";
// import TestUseContext from "./pages/react-hook/test-use-context";
// import TestUseImperativeHandle from "./pages/react-hook/test-use-imperative-handle";
// import TestUseCallback from "./pages/react-hook/test-use-callback";
// import TestUseMemo from "./pages/react-hook/test-use-memo";
// import TestCustomerHook from "./pages/react-hook/test-customer-hook";
import Test from './pages/react-hook/test';
// import ClassCpnTest from "./pages/类组件/classComponent";
// import Swiper from './pages/redux的基本使用/swiper/swiper';
function App(props) {
  const [show,setShow] = useState(true);
  return (
    <div>
      {/* 路由相关测试 */}
      {/* <button onClick={() => props.history.goBack()}>后退</button>
      <button onClick={() => props.history.goForward()}>前进</button> */}
     {/* <Counter/> */}
     {/* <Person/> */}
     {/* renderRoutes实现了对路径的统一管理 统一渲染
      Route组件定义的路由太过于混乱
     */}
     {/* <RouterTest/> */}
      {/* {renderRoutes(routes)}; */}

     {/* reactHooks */}
      {/* <TestUseState/> */}
      {/* <TestUseRef/> */}
      {/* {show && <TestUseEffect/>} */}
      {/* <TestUseReducer/> */}
      {/* {show && <TestUseLayoutEffect/>} */}
      {/* <TestUseContext/> */}
      {/* <TestUseImperativeHandle/> */}
      {/* <TestUseCallback/> */}
      {/* <TestUseMemo/> */}
      {/* <TestCustomerHook/> */}
      {show && <Test/>}
      {/* <ClassCpnTest/>
      <Swiper/> */}
     <button onClick={() => {setShow(!show)}}>{show ? '隐藏' : '显示'}</button>
    </div>
  );
}

export default withRouter(App);
