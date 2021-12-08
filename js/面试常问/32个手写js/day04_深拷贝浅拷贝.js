// const stuInfo = {'name':'hjp','age':18,property:[{money:8888888888},{car:'BMW'}]}
// // 浅拷贝
// function clone(target){
//   if(typeof target == 'object') {
//     let result = Array.isArray(target) ? [] : {};
//     for(const key in target) {
//       result[key] = target[key];
//     }
//     return result;
//   }else{
//     return target;
//   }
// }

// // 修改了stuInfoClone1的car stuInfo的car也受影响
// const stuInfoClone = clone(stuInfo);
// stuInfoClone.property[1].car="LandRoad"
// console.log(stuInfo)


// // 最简单的深拷贝 
// /*
// 弊端：
// 非数组对象中：当值为函数或者为undefined的时候会被忽略
// 数组中：当值为函数或者为undefined的时候会被转换为null
// 单独转换中：当值为函数或者为undefined的时候会被转换为undefined
// */
// function simpleDeepClone(target){
//   return JSON.parse(JSON.stringify(target))
// }
// const target = {
//   field1: 1,
//   field2: undefined,
//   field3: {
//       child: 'child'
//   },
//   field4: [2, 4, 8]

// };
// console.log(simpleDeepClone(target))
// console.log(simpleDeepClone(stuInfo))


// // 深拷贝
// function deepClone(target){
//   // 判断要拷贝的对象是基本类型还是引用类型
//   if(typeof target == 'object') {
//     let result = Array.isArray(target) ? [] : {};
//     for(const key in target) {
//       // 判断值的类型 如果是基本数据类型就直接返回 是对象就递归调用
//       if(typeof target[key] === "object"){
//         result[key] = deepClone(target[key]);
//       }else{
//         result[key] = target[key];
//       }  
//     }
//     return result;
//   }else{ // 基本数据类型直接返回
//     return target;
//   }
// }
// const stuInfoClone1 = deepClone(stuInfo);
// 修改了stuInfoClone1  stuInfo不受影响
// stuInfoClone1.property[1].car="Benchi"
// console.log(stuInfo)

// 循环引用
// const kobe = {name: "seven"}
// const curry = {name:'curry',ref:kobe}
// kobe.ref = curry;
// console.log(kobe,curry)
// const newObj = deepClone(kobe) 使用之前的方法会导致栈溢出 Maximum call stack size exceeded

//为什么会出现上述的错误？
/*
  因为出现了循环引用的时候，在递归的地方会无限循环的去拷贝这个引用对象，相当于一直在画圈圈
*/
// 解决方案：将对象放在map中，如果已经拷贝过了，直接去map中拿即可，不用再去重新拷贝
const kobe = {name: "seven"}
const ultimateDeepClone = function(target,map = new Map()) {
  // 如果map中有，就从map中拿
  if(map.get(target)){
    return map.get(target);
  }
  else if(typeof target === "function"){
    //new Function('return '+fun.toString()) 返回的是一个函数 而这个函数的返回值才是我们想要的函数
    //  把它变成普通函数 调用一下它
    console.log('aaa',new Function('return '+target.toString()))
    const result = new Function('return '+target.toString())()
    map.set(target,result);
    return result
  }
  else if(typeof target === "object") {
    let result = Array.isArray(target) ? [] : {};
    // 没有的话就将它放入map中
    map.set(target,result)
    // 遍历源对象重新赋值
    for(const key in target){
      if(typeof target[key] === "object" || typeof target[key] === "function"){
        // 如果是个对象则递归调用
        result[key] = ultimateDeepClone(target[key],map)
      }else{
        result[key] = target[key];
      }
    }
    return result;
  }else{
    return target;
  }
}
console.log(ultimateDeepClone(kobe))
const F = function () {
  console.log('fff')
}
F.name = 'hjp123'
const D = ultimateDeepClone(F)
D.age = '123'
console.log(F.age) // 这里打印出了undefine说明D、F不是同一个函数

