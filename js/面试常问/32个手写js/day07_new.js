function newOperator(ctor,...args){
  if(typeof ctor !== 'function'){
    throw TypeError('ctor must be a function');
  }
  // 创建一个函数实例 指向ctor.prototype
  const obj = Object.create(ctor.prototype);
  // 执行ctor的构造函数的方法
  const result = ctor.apply(obj,args);
  // 判断构造函数的执行结果 来判断返回的数据
  const isObject = typeof result == 'object' && result !== null;
  const isFunction = typeof result == 'function'
  return isObject || isFunction ? result : obj;
}
