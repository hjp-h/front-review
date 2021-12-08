// 1.首先promise有3种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
// 2.创建Promise类
class MyPromise{
  /*
  3.
   想想我们在使用的时候是不是先传入一个函数 这个函数有两个变量，
  一个是resolve,一个是reject
  在这里我们将它当为executor  (resolve,reject) => {}
  */
 constructor(executor){
   // 错误捕捉与处理
   try{
    executor(this.resolve, this.reject);
   }catch(e){
     this.reject(e);
   }
   
 }
 // 接着我们要写一些初始化的东西
 //4.1 初始状态
 status = PENDING;
 //4.2 成功的初始值
 value = undefined;
 //4.3 失败的初始值
 reason = undefined;
  // 把then方法中的回调函数保存起来（解决异步请求 then无输出问题）
//  onFulfilledCallback = null;
//  onRejectedCallback = null;

 // 定义回调函数的数组将回调函数存储起来
 onFulfilledCallbacks = []
 onRejectedCallbacks = []
 //5.1 编写resolve函数
 resolve = value => {
   // 只有状态是pending的时候才可以修改状态
   if(this.status === PENDING){
     // resolve修改为成功的状态
      this.status = FULFILLED;
      this.value = value;
      // 异步代码执行resolve时 只适用于调用一次then的情况
      // this.onFulfilledCallback && this.onFulfilledCallback(value);
      this.onFulfilledCallbacks.forEach(fn => {fn(value)})
   }
 }
 // 5.2 同理我们可以编写出reject函数
 reject = reason => {
   if(this.status === PENDING){
     this.status = REJECTED;
     this.reason = reason;
    //  this.onRejectedCallback && this.onRejectedCallback(reason);
    this.onRejectedCallbacks.forEach(fn => {fn(reason)})
   }
 }

 // 实现静态的resolve reject
static resolve(parmater){
  if(parmater instanceof MyPromise){
    return parmater;
  }
  return new MyPromise(resolve => {
    resolve(parmater);
  })
}

static reject(reason){
  return new MyPromise((resolve, reject) => {
    reject(parmater);
  })
}
 /* 6.创建Promise实例后可以调用then方法 使用的时候
    我们创穿进去了两个回调函数 一个是成功的回调 一个是失败的回调
    new Promise().then(data => {},error => {})
 */
 then = (onFulfilled, onRejected) => {
   // 参数变为可选的
   onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
   onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
   const myPromise2 = new MyPromise((resolve,reject) => {
    if(this.status === FULFILLED){
        queueMicrotask(() => {
          try{
            const x = onFulfilled(this.value);
            // 解决链式调用 以及 返回本身的问题
            resolvePromise(myPromise2,x,resolve,reject)
          }catch(e){
            reject(e);
          }
        })
    }
    else if(this.status === REJECTED){
      queueMicrotask(() => {
        try{
          onRejected(this.reason);
          // 解决链式调用 以及 返回本身的问题
          resolvePromise(myPromise2,x,resolve,reject)
        }catch(e){
          reject(e);
        }
      })
    }
    /* 当有异步的代码时，then会先执行，但是此时还没有resolve value，reason为空的
    先将两个回调方法保存起来
    */
    else if(this.status === PENDING){
     //  只适用于一个then
     //  this.onFulfilledCallback = onFulfilled;
     //  this.onRejectedCallback = onRejected;
 
     this.onFulfilledCallbacks.push(() => {
       queueMicrotask(() => {
          try{
            const x = onFulfilled(this.value);
            // 解决链式调用 以及 返回本身的问题
            resolvePromise(myPromise2,x,resolve,reject)
          }catch(e){
            reject(e);
          }
       });
     });
     this.onRejectedCallbacks.push(() => {
        queueMicrotask(() => {
          try{
            onRejected(this.reason);
            // 解决链式调用 以及 返回本身的问题
            resolvePromise(myPromise2,x,resolve,reject)
          }catch(e){
            reject(e);
          }
        })
     });
    }
   });
   return myPromise2;
 }
}

function resolvePromise(promise2,x,resolve,reject) {
  if(x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 执行 result，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
  // result.then(value => resolve(value), reason => reject(reason))
  x instanceof MyPromise ? x.then(resolve,reject) : resolve(x);
}
// 下面的代码正常输出
// const promise = new MyPromise((resolve, reject) => {
//   resolve('success')
//   reject('err')
// })

// promise.then(value => {
//  console.log('resolve', value)
// }, reason => {
//  console.log('reject', reason)
// })
// promise.then(value => {
//   console.log('resolve1', value)
//  }, reason => {
//   console.log('reject1', reason)
//  })

// 添加setTimeout之后，无输出
// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 2000); 
// })
// promise.then(value => {
//   console.log('resolve=>', value)
// }, reason => {
//   console.log('reject=>', reason)
// })

// 为什么？
/*
MyPromise传入的回调函数会先执行，但是遇到了setTimeout他是个宏任务，放入宏任务队列
接着执行then方法而此时status为pending,但是我们的then方法并没有判断pending,因此无输出
*/

// 解决:
/*
当状态为pending的时候，我们将onFulfilled和onRejected这两个回调函数保存起来
等到延时的时间到，再在resolve方法调用即可
 */

// 下面的代码执行后只输出了最后一个then 1,2丢了
// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 2000); 
// })

// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
// })
 
// promise.then(value => {
//   console.log(2)
//   console.log('resolve', value)
// })

// promise.then(value => {
//   console.log(3)
//   console.log('resolve', value)
// })
// 为什么？
/*
这是因为代码中调用了了多个then,最后一个then的回调会覆盖前面的then定义的回调函数
*/
// 解决：
/*
用一个数组将回调函数存储起来
*/

// 下面的代码无法进行链式调用 会报错 then of undefined
// const promise = new MyPromise((resolve, reject) => {
//   // 目前这里只处理同步的问题
//   resolve('success')
// })

// function other () {
//   return new MyPromise((resolve, reject) =>{
//     resolve('other')
//   })
// }
// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   return other()
// }).then(value => {
//   console.log(2)
//   console.log('resolve', value)
// })

// 为什么？
/*
这是因为我们还没有实现链式调用 目前只支持调用一次then 不能连续调用
*/
// 解决then方法中 我们让它返回的是promise即可

// 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错
// const promise = new MyPromise((resolve, reject) => {
//   resolve('success')
// })
// const p1 = promise.then(value => {
//  console.log(1)
//  console.log('resolve', value)
//  return p1
// })

// // 运行的时候会走reject
// p1.then(value => {
// console.log(2)
// console.log('resolve', value)
// }, reason => {
// console.log(3)
// console.log(reason.message)
// })

// 错误处理
// const promise = new MyPromise((resolve, reject) => {
//   throw new Error('执行器错误')
// })

// promise.then(value => {
// console.log(1)
// console.log('resolve', value)
// }, reason => {
// console.log(2)
// console.log(reason.message)
// })


// const promise = new MyPromise((resolve, reject) => {
//   resolve('success')
//   // throw new Error('执行器错误')
// })

// // 第一个then方法中的错误要在第二个then方法中捕获到
// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   throw new Error('then error')
// }, reason => {
//   console.log(2)
//   console.log(reason.message)
// }).then(value => {
//   console.log(3)
//   console.log(value);
// }, reason => {
//   console.log(4)
//   console.log(reason.message)
// })


// 参数可传可不传
const promise = new MyPromise((resolve, reject) => {
  resolve('succ')
})
 
promise.then().then().then(value => console.log(value))

const promise1 = new MyPromise((resolve, reject) => {
  reject('err')
})
 
promise1.then().then().then(value => console.log(value), reason => console.log(reason))
