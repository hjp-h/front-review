// 方法1 递归
function fib(n) {
  if(n === 0 || n === 1){
      return 1
  }
  return fib(n-1)+fib(n-2)
}
// 方法二 迭代
function fib(n){
  let a = 1;
  let b = 1;
  let c = a+b;
  for(let i=3;i<=n;i++){
      a = b;
      b = c;
      c = a+b;
  }
  return c;
}
fib(3)
