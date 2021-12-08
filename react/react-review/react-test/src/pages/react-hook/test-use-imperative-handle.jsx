import React, { useImperativeHandle, forwardRef, useRef } from "react";
// useImperativeHandle的出现就是为了控制父组件通过ref控制子组件的权限 搭配forWardRef使用
const JPInput = forwardRef((props, ref) => {
  // 子组件本身的inputRef
  const inputRef = useRef();
  // useImperativeHandle接收三个参数
  // 第一个是父组件传来的需要绑定权限的ref
  // 第二个是回调函数 返回一个对象
  // 第三个是依赖数组 只有依赖数组中的元素变化时 子组件才重新将属性赋值给父组件传来的ref.current上
  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current.focus();
      },
      value: inputRef.current.value,
    }),
    [inputRef]
  );
  return <input type="text" ref={inputRef} />;
});
export default function TestUseImperativeHandle() {
  const inputRef = useRef();
  return (
    <div>
      <JPInput ref={inputRef} />
      <button
        onClick={() => {
          inputRef.current.focus();
          console.log(inputRef.current.value);
        }}
      >
        聚焦
      </button>
    </div>
  );
}
