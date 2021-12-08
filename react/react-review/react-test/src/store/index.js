// 导入创建store和applyMiddleWare的方法
import {createStore,applyMiddleware} from 'redux';
// 导入创建好的reducer
import reducer from './reducers';
// 开发者调试
import {composeWithDevTools} from 'redux-devtools-extension'
// 导入redux-thunk使得store.dispatch()能够处理异步action
import thunk from 'redux-thunk';
// 创建store对象并导出
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));
