import React, { Component } from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { createAddPersonAction } from "../../store/actions/person";
export class Person extends Component {
  addPerson = () => {
    const name = this.pName.value;
    const age = this.pAge.value;
    const newPerson = { id: nanoid(), name, age };
    this.props.addPerson(newPerson);
  };
  render() {
    return (
      <div>
        <h2>我是person组件，上方组件求和为：{this.props.count}</h2>
        <input
          ref={(c) => (this.pName = c)}
          type="text"
          placeholder="请输入姓名"
        />
        <input
          ref={(c) => (this.pAge = c)}
          type="text"
          placeholder="请输入年龄"
        />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {this.props.person.map((item) => {
            return (
              <li key={item.id}>
                {item.name}:{item.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    console.log("person", this.props.location.state);
  }
}

const mapStateToProps = (state) => ({
  count: state.count,
  person: state.person,
});
const mapDispatchToProps = (dispatch) => ({
  addPerson: (data) => dispatch(createAddPersonAction(data)),
});
// 连接容器和Store
export default connect(mapStateToProps, mapDispatchToProps)(Person);
