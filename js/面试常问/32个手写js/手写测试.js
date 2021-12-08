// 浅拷贝
function shallowClone(target) {
  // 判断它是个对象还是普通类型
  if(typeof target === 'object'){
    // 判断他是个{}还是[]
    let result = Array.isArray(target) ? [] : {};
    // 遍历key 赋值
    for(let key in target){
      result[key] = target[key];
    }
    return result;
  }else{
    // 普通类型直接返回
    return target;
  }
}

// 深拷贝（简单版）
// 遇到function undefined会忽略
function simpleDeepClone(target) {
  return JSON.parse(JSON.stringify(target));
}

// 深拷贝（完整版）
function deepClone(target,map = new Map()) {
  const type = typeof target;
  if(type === 'function'){
    return new Function('return ' + target.toString())();
  }
  else if(type === 'object'){
    // 如果map里面有 就从map里面拿
    if(map.get(target)){
      return map.get(target);
    }
    // 设置在map中
    const result = Array.isArray(target) ? [] : {};
    map.set(target,result);
    for(let key in target){
      if(typeof target[key] === 'object' || typeof target[key] === 'function'){
        result[key] = deepClone(target[key],map);
      }else{
        result[key] = target[key];
      }
    }
  }else{
    return target;
  }
}

// 数组去重
// const arr = [1,2,2,3,4,3,4]
// 方法一 ：set
// const result = new Set(arr);

// 方法二： includes
// const uniqueArr1 = (arr) => {
//   const result = [];
//   arr.forEach((item,index) => {
//     if(!result.includes(item)){
//       result.push(item);
//     }
//   });
//   return result;
// }

//方法三: indexOf
// const uniqueArr2 = (arr) => {
//   const result = [];
//   arr.forEach((item,index) => {
//     if(result.indexOf(item) === -1){
//       result.push(item);
//     }
//   });
//   return result;
// }

//方法四 map
// const uniqueArr3 = (arr) => {
//   const map = new Map();
//   const result = [];
//   arr.forEach((item,index) => {
//     if(!map.has(item)){
//       map.set(item,0);
//       result.push(item);
//     }
    
//   });
//   return result;
// }

//方法五 filter
// const uniqueArr4 = (arr) => {
//   const result = [];
//   result = arr.filter((item,index) => {
//     return arr.indexOf(item) === index;
//   })
//   return result;
// }


// 数组扁平化
// const flattedArr = [1,2,3,[1,2,3]]
// 方法一 Array.flatten
// const result = Array.flatten(flattedArr);

// 方法二 正则
// const reg = /\[|\]/g;
/*
"["+["1", "2", "1", "2", "3", "4", "5"]+"]"
"[1,2,1,2,3,4,5]"
*/
// const result = JSON.parse("["+JSON.stringify(flattedArr).replace(reg,'').split(',')+"]") 

// 方法三：reduce
// const flatten = (arr) => {
//   return arr.reduce((pre,cur) => {
//     return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
//   },[])
// }


// 方法四：函数递归
// const result = [];
// const flatten1 = (arr) => { 
//   arr.forEach((item) => {
//     const isArray = Array.isArray(item);
//     if(isArray){
//       flatten1(item)
//     }else{
//       result.push(item);
//     }
//   })
// }

// 数组方法的实现
// 1.forEach
// Array.prototype.forEach = function(callback,thisArg){
//   // 错误优先 看看是否有错误 判断this和callback
//   if(this === null){
//     throw new Error("this is null")
//   }
//   if(typeof callback !== "function"){
//     throw new Error("callback is not a function")
//   }
//   // 获取调用的对象
//   const arr = Object(this); 
//   for(let i=0; i<arr.length; i++){
//     // 遍历数组执行里面的方法
//     arr.callback.call(thisArg,arr[i],i,arr);
//   }
// }

//2. filter
// Array.prototype.filter = function (callback,thisArg) {
//   // 错误优先
//   if(this === null){
//     throw new Error('this is null');
//   }
//   if(typeof callback !== 'function'){
//     throw new Error('callback is not a function');
//   }
//   const arr = Object(this);
//   const result = [];
//   for(let i = 0; i < arr.length;i++){
//     if(callback.call(thisArg, arr[i],i,arr)){
//       result.push(arr[i]);
//     }
//   }
//   return result;
// }

// 3.map
// Array.prototype.map = function (callback,thisArg) {
//   if(this === null){
//     throw new Error("this is null");
//   }
//   if(typeof callback !== "function"){
//     throw new Error("callback must be a function")
//   }
//   const arr = Object(this);
//   const result = [];
//   for(let i = 0; i < arr.length; i++) {
//     result[i] = callback.call(thisArg, arr[i],i,arr);
//   }
    //  return result;
// }


//4.reduce
// Array.prototype.reduce = function (callback,initial) {
//   if(this === null) {
//     throw new Error('this is null');
//   }
//   if(callback !== 'function') {
//     throw new Error('callback is not a function');
//   }
//   if(initial === undefined) {
//     throw new Error('initial is undefined');
//   }
//   const arr = Object(this);
//   // pre初值
//   let pre = initial;
//   for(let i = 0; i < arr.length; i++) {
//     pre = callback.call(null,pre,arr[i],i,arr);
//   }
//   return pre;
// }

// 1.call
// Fuction.prototype.call = function(context,...args){
//   if(typeof this !== 'function'){
//     throw new Error('this is not a function')
//   }
//   context = context || window;
//   // 创建一个symbol类型
//   const fn = Symbol('fn');
//   context[fn] = this;
//   const result = context[fn](...args);
//   delete context[fn];
//   return result;
// }


//2.applay
// Fucntion.prototype.apply = function (context,args){
//   if(typeof this !== 'function'){
//     throw new Error('this is not a function');
//   }
//   context = context || window;
//   // 创建一个Symbol
//   const fn = Symbol('fn');
//   // 将this(换绑的函数)保存起来
//   context[fn] = this;
//   // 调用函数取得返回结果 (相当于在context这个对象里面调用 隐式调用)
//   const result = context[fn](...args);
//   delete context[fn];
//   return result;
// }


//3.bind
// Function.prototype.bind = function (context,args){
//   if(typeof this !== 'function'){
//     throw new Error('this is not a function')
//   }
//   context = context || window;
//   // 将this保存起来 因为bind返回的是一个函数
//   const self = this;
//   return function (){
//     // ...arguments是返回的是一个函数 函数被调用的时候又可以传入参数
//     // 考虑new的情况
//     if(this instanceof Function){
//       return new self(...args,...arguments)
//     }
//     return self.apply(context,[...args,...arguments])
//   }
// }

// 防抖（多次触发只会执行一次）
// function debounce(fn,delay){
//   let timer = null;
//   return function(){
//     if(timer){
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       fn.applay(this,[...arguments])
//     },delay);
//   }
// }

// 防抖立即执行版
// function debounceImmediate(fn,delay) {
//   let timer = null;
//   return function(){
//     let first = !timer;
//     if(first){
//       fn.apply(this,[...arguments])
//     }
//     if(timer){
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       fn.apply(this,[...arguments])
//     },delay)
//   }
// }
// 节流（触发之后，一定时间内只执行一次）
// 时间戳版
// function throttle(fn,delay){
//   let begin = 0;
//   return function(){
//     let now = Date.now();
//     if(now - begin > delay){
//       fn.apply(this,[...arguments])
//       begin = now;
//     }
//   }
// }

// 计时器版本
// function throttleT(fn,delay){
//   let timer = null;
//   return function(){
//     if(!timer){
//       fn.apply(this,[...arguments]);
//       timer = setTimeout(() => {
//         clearTimeout(timer);
//       },delay);
//     }
//   }
// }


// 模拟new操作
// function newOperator(ctor,...args){
//   if(typeof ctor !== 'function'){
//     throw new Error('ctor is not a function')
//   }
//   // 1.创建一个实例 指向构造函数的原型
//   const obj = Object.create(ctor.prototype);
//   // 2.执行构造函数 绑定this
//   const result = ctor.apply(obj,args);
//   // 3.根据执行结果返回 如果是引用类型 则返回  否则返回创建的对象
//   const isObject = typeof result === 'object' && result !== null;
//   const isFunction = typeof result === 'function';
//   return isObject || isFunction ? result : obj; 
// }


// 函数柯里化 add(1)(2)(3)
// function add(){
//   let _args = [...arguments];
//   function fn(){
//     _args.push(...arguments);
//     return fn;
//   }
//   fn.toString = function(){
//     return _args.reduce((pre,cur) => pre+cur,0)
//   }
//   return fn;
// }

// 手写promise
// promise的三种状态
const PENDING = 'pending';
const FILLFILED = 'fullfiled';
const REJECTED = 'rejected';
class MyPromise {
  constructor(executor){
    try{
      // promise第一个参数是函数，函数的两个参数都是函数
      executor(this.resolve,this.reject)
    }
    catch(err){
      this.reject(err);
    }
  }
  // 当前的状态
  status = PENDING;
  // 成功的结果
  value = null;
  // 失败的原因
  result = null;
  // 成功的回调函数数组
  onFullfilledCallbacks = [];
  // 失败的回调函数数组
  onRejectedCallbacks = [];
  // 更改成功后的状态 
  resolve = (value) => {
    console.log('123',value)
    // 只有在pending中的状态才能修改
    if(this.status === PENDING) {
      // 将状态修改为成功
      this.status = FILLFILED;
      // value赋值
      this.value = value;
      // 执行成功回调函数数组中的方法
      while(this.onFullfilledCallbacks.length){
        console.log('resolve',value)
        this.onFullfilledCallbacks.shift()(value);
      }
    }
  }
  // 更改失败后的状态
  reject = (result) => {
    // 只有在pending中的状态才能修改
    if(this.status === PENDING) {
      // 将状态修改为成功
      this.status = REJECTED;
      // value赋值
      this.result = result;
      // 执行成功回调函数数组中的方法
      while(this.onRejectedCallbacks.length){
        this.onRejectedCallbacks.shift()(result);
      }
    }
  }
  then = (onFullFiled,onRejected) => {
    // 判断参数的合法性
    onFullFiled = typeof onFullFiled === 'function' ? onFullFiled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw new Error(reason);};
    // then 方法返回的是一个promise 创建一个promise
    const MyPromise2 = new MyPromise((resolve,reject) => {
      // 状态为成功时执行的函数
      const fullfiledMicroTask = () => {
          // 因为要拿到MyPromise2的值，所以用到了queueMicrotask
          queueMicrotask(() => {
            try{
              const result = onFullFiled(this.value);
              resolvePromise(result,MyPromise2,resolve,reject);
              }
            catch(e){
              reject(e);
            }
          });
        
      }
      // 状态为失败时执行的函数
      const rejectedMicroTask = () => {
          // 因为要拿到MyPromise2的值，所以用到了queueMicrotask
          queueMicrotask(() => {
            try{
              const result = onRejected(this.result);
              resolvePromise(result,MyPromise2,resolve,reject);
            }
            catch(e){
              reject(e);
            }      
          });
        
      };
      // 状态为成功了则执行成功的函数
      if(this.status = FILLFILED){
        fullfiledMicroTask();
      }
      // 状态为失败了则执行失败的函数
      else if(this.status = REJECTED){
        rejectedMicroTask();
      }
      else{
        // 状态仍为等待 将成功和失败的函数存储起来
        this.onFullfilledCallbacks.push(fullfiledMicroTask);
        this.onRejectedCallbacks.push(rejectedMicroTask);
      }
    });
    // 返回
    return MyPromise2;
  }
  static resolve = (value) => {
    if(value instanceof MyPromise){
      return value;
    }
    return new MyPromise(resolve => {
      resolve(value);
    });
  }

  static reject = (reason) => {
    return new MyPromise((resolve ,reject) => {
      reject(reason);
    });
  }


  static all = (promiseArr) => {
    return new MyPromise((resolve, reject) => {
      const result = [];
      let count = 0;
      promiseArr.forEach(item => {
        MyPromise.resolve(item).then(value => {
          result.push(value);
          count ++;
          if(count === promiseArr.length){
            console.log('count',result)
            resolve(result);
          }
        },error => {
          reject(error);
        })
      })
    })
  }
}
function resolvePromise(result,MyPromise2,resolve,reject){
  if(result === MyPromise2){
    throw new Error('链式调用了')
  }
  result instanceof MyPromise ? result.then(resolve,reject) : resolve(result);
}

const p = MyPromise.all([1,2,3]);
p.then(value => {
  console.log('value',value)
},error => {
  console.log('error',error)
})
