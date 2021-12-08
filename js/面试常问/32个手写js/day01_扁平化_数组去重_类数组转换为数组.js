/**
 * 数组扁平化
 */
 const arr = [1,2,[1,2,3,[4,5]]]

// 方法一 数组的flat方法
// console.log(arr.flat(Infinity))

// 方法二 正则表达式
// const result = JSON.parse("["+JSON.stringify(arr).replace(/\[|\]/g,"").split(',')+"]");
// console.log(result)

// 方法三 reduce递归
// const flatten = arr => {
//   return arr.reduce( (pre,cur) => {
//     return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
//   } ,[])
// }
// console.log(flatten(arr))
const flatten = arr => {
  return arr.reduce( (pre,cur) => 
    pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  ,[])
}
// 方法四、函数递归
// const res = []
// const convertFlatten = arr => {
//   for (let i = 0; i < arr.length; i++) {
//     if(Array.isArray(arr[i])) {
//       convertFlatten(arr[i])
//     }else {
//       res.push(arr[i])
//     }
//   }
// }
// convertFlatten(arr)
// console.log(res)

/**
 * 数据去重
 */
const arr1 = [1,2,2,3,4,3,5]

// 方法一 set方法
// const res = new Set(arr1);
// console.log(Array.from(res))

// 方法二 includes 方法 indexof方法类似
// const res = [];
// for(let item of arr1) {
//   if(! res.includes(item)){
//     res.push(item);
//   }
// }
// console.log(res);

// 方法三 filter方法
// const res = arr1.filter((item,index) => {
//   return arr1.indexOf(item) === index
// })
// console.log(res)

// 方法四 利用Map
// const map = new Map();
// const res = []
// for(let item of arr1){
//   if(! map.has(item)){
//     map.set(item);
//     res.push(item);
//   }
// }
// console.log(res)

/**
 *  类数组转换为数组
 */
// 方法一 Array.from
// 方法二 Array.prototype.concat.apply([],类数组)
// 方法三 Array.prototype.slice.call(类数组)
// 方法四 [...类数组]



