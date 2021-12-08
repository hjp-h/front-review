//经典面试题：实现add(1)(2)(3)(4)=10; 、 add(1)(1,2,3)(2)=9;
function add(){
  // 收集参数
  const _args = [...arguments];
  function fn(){
    // 收集参数
    _args.push(...arguments);
    return fn;
  }
  // 最后才一起执行
  fn.toString = function(){
    return _args.reduce((pre,cur) => pre+cur,0)
  }
  return fn;
}
