import React from "react";
import { NavLink } from "react-router-dom";
import Counter from "../pages/redux的基本使用/counter";
import Person from "../pages/redux的基本使用/person";
import Detail from "../pages/redux的基本使用/c-pages/detail";
const routes = [
  { 
    path: '/',
    exact: true,
    render: () => <NavLink to="/counter" component={Counter} />
  },
  { 
    path:'/counter',
    component:Counter,
    // 子路由
    routes:[
      { 
        path:'/counter/detail',
        component:Detail
      }
    ]
  },
  { 
    path: '/person',
    component:Person
  }
]
export default routes;
