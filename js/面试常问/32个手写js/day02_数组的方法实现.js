
//1.判断this是不是undefined
  //2.判断callback
  //3.获取this
  //4.遍历this 看看里面的每一项是否符合标准 是的话加入新数组
  //5.将新数组返回
  
// Array.prototype.filter = function(callback,thisArg) {
//   // 1.判断this是否合法
//   if(this == undefined){
//     throw new TypeError("this is null or undefined")
//   }
//   // 2.判断callback是不是function
//   if(typeof callback !== "function") {
//     throw new TypeError("callback is not a function")
//   }
//   // 3.获取this 转换成Object
//   const arr = Object(this);
//   const len = arr.length;
//   const res = [];
//   // 4.遍历数组中的每一项
//   for(let i = 0; i < len; i++) {
//     if(callback.call(thisArg,arr[i],i,arr)) {
//        res.push(arr[i]);
//     }
//   }
//   return res;
// }
// const arr = [1,1,2,2,345,5,2];
// const result = arr.filter((item,index) => {
//   return arr.indexOf(item) === index;
// })
// console.log(result)

// // map
// Array.prototype.map = (callback,thisArg) => {
//   if(this === undefined){
//     throw new TypeError("this is null or undefined")
//   }
//   if(typeof callback !== "function"){
//     throw new TypeError("callback is not a function")
//   }
//   // 获取this
//   const arr = Object(this);
//   const result = [];
//   for(let i=0;i<arr.length;i++){
//     result[i] = callback.call(thisArg,arr[i],i,arr);
//   }
//   return res;
// }

// // reduce
// Array.prototype.reduce = (callback,initialValue) => {
//   if(this === undefined){
//     throw new TypeError("this is null or undefined");
//   }
//   if(typeof callback !== "function"){
//     throw new TypeError("callback is not a function")
//   }
//   if (initialValue === undefined) {
//     throw new TypeError('Reduce of empty array with no initial value');
//   }
//   let pre = initialValue;
//   const arr = Object(this);
//   for(let i = 0; i < arr.length;i++){
//     pre = callback.call(undefined, pre,arr[i],i,arr);
//   }
//   return pre;
// }

// reduce
Array.prototype.reduce = function(callback, initialValue) {
  if (this == undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('callback is not a function');
  }
  const arr = Object(this);
  let pre = initialValue;
  let k = 0;
  // 如果第二个参数为undefined的情况下
  // 则数组的第一个有效值作为累加器的初始值
  if (initialValue === undefined) {
    throw new TypeError('Reduce of empty array with no initial value');
  }
  while (k < arr.length) {
    pre = callback.call(undefined, pre, arr[k], k, arr);
    k++;
  }
  return pre;
}
console.log([1,2,3].reduce((pre,cur) => pre+cur,0))
