import React, { Component } from "react";
export default class ClassCpnTest extends Component {
  state = {
    count: 0,
    name: "hjp",
  };
  add = () => {
    this.setState((preState) => {
      console.log(111);
      const count = preState.count;
      return { count: count + 1 };
    });
    console.log(this.state.count);
  };
  render() {
    const { count, name } = this.state;
    return (
      <div>
        <h1>当前用户：{name}</h1>
        <h2>当前计数：{count} </h2>
        <button onClick={this.add}>点我+1</button>
      </div>
    );
  }
}
