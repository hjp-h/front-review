//首先定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
// function resolvePromise 用来检查回调函数返回的类型
function resolvePromise(myPromise2,x,resolve,reject) {
  // 如果返回的对象跟声明时的对象一样 就抛出异常
  if(myPromise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 如果是promise对象就调用它的then方法 把它的状态改为fullfilled 或者 reject
  x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
}
// 声明一个promise类
class MyPromise {
  // 首先我们使用promise的时候会传入一个executor
  constructor(executor) {
    try {
      // executor 传入两个函数
      executor(this.resolve,this.reject);
    }catch(e) {
      this.reject(e);
    }
  }
  // 初始化一些状态
  // 初始状态
  status = PENDING;
  // 成功时的初始值
  value = null;
  // 失败时的初始值
  reason = null;
  // 成功时执行的回调函数队列
  onFulfilledCallbacks = [];
  // 失败时的回调
  onRejectCallbacks = [];
  // 回调函数resolve和reject
  resolve = value => {
    if(this.status === PENDING){
      // 只有状态为PENDING的时候才可以修改状态
      this.status = FULFILLED;
      // 赋值
      this.value = value;
      // 这里一般用于异步操作时 将多个函数保存起来执行
      this.onFulfilledCallbacks.forEach(fn => {fn()})
    }
  }
  reject = reason => {
    if(this.status === PENDING){
     // 只有状态为PENDING的时候才可以修改状态
     this.status = REJECTED;
     // 赋值
     this.reason = reason;
     // 这里一般用于异步操作时 将多个函数保存起来执行
     this.onRejectCallbacks.forEach(fn => {fn()})
    }
  }
  then(onFulfilled, onRejected){
    // 为了能实现链式调用 需要返回一个promise实例
    // 根据状态来调用响应的回调函数
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    const realONRejected = typeof onRejected === 'function' ? onRejected : reason => {throw(reason)};
    const myPromise2 = new MyPromise((resolve, reject) => {
      const fullFilledMicrotask =  queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(myPromise2,x,resolve, reject);
          }catch(e) {
            reject(e);
          }
      });
      const rejectedMicrotask = queueMicrotask(() => {
        try {
          const x = onRejected(this.reason);
          resolvePromise(myPromise2,x,resolve, reject);
        } catch(e) {
          reject(e);
        }
      })
      if(this.status === FULFILLED){
        // 因为要在这里面使用到myPromise2 因此要使用微任务队列延时执行 才能拿到它
        fullFilledMicrotask();
      }
      else if(this.status === REJECTED){
        rejectedMicrotask();
      }
      else if(this.status === PENDING){
        // 将成功和失败的回调方法存储起来 让他们在resolve或者reject时自动执行
        this.onFulfilledCallbacks.push(fullFilledMicrotask);
        this.onRejectCallbacks.push(fullFilledMicrotask);
      }
    })
    return myPromise2;
  }
  static resolve(value){
    if(value instanceof MyPromise) {
      return value;
    }
    return new MyPromise(resolve => {
      resolve(value);
    })
  }
  static reject(reason){
    return new MyPromise((resolve,reject) => {
      reject(reason);
    })
  }
  static all(promiseArr){
    return new MyPromise((resolve, reject) => {
      // 存放结果的数据
      const ans = [];
      // 计算当前的promise的执行情况
      const counter = 0;
      // 遍历数组 执行里面的每一个promise
      for(let i=0; i<promiseArr.length;i++){
        promiseArr[i].then(res => {
          ans[i] = res;
          counter++;
          if(counter === promiseArr.length){
            resolve(ans);
          }
        }).catch(e => {
          reject(e);
        })
      }
    })
  }
}
