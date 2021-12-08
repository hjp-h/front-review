// call的实现
Function.prototype.call = (context,...args) => {
  context = context || window;
  if(typeof this !== "function"){
    throw new TypeError("this is not a function");
  }
  // 创建一个Symbol来保证属性的唯一性 防止覆盖
  const fn = Symbol('fn');
  // 为了后面能够调用this()
  context[fn] = this;
  const result = context[fn](...args);
  // 用完就扔掉
  delete context[fn];
  return result;
}
// apply的实现
Function.prototype.apply = (context,args) => {
  context = context || window;
  if(typeof this !== "function"){
    throw new TypeError("this is not a function");
  }
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}
// bind的实现
Function.prototype.bind = (context,args) => {
  context = context || window;
  if(typeof this !== "function"){
    throw new TypeError("this is not a function");
  }
  var self = this;
  return function (){
    // 考虑new的情况
    if(this instanceof Function) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, [...args,...arguments]);
  }
}
