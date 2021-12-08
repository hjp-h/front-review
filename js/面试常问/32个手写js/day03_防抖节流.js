// 防抖
// 用户触发多次 最终只执行一次 
// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
function debounce(fn, delay) {
  let timer = null;
  return function() {
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    },delay);
  }
}

// 防抖立即执行版
function debounce1(fn, delay) {
  let timer = null;
  return function() {
    let first = !timer;
    if(timer){
      clearTimeout(timer);
    }
    if(first){
      fn.apply(this, arguments);
    }
    timer = setTimeout(() => {
      timer = null;
    },delay);
  }
}
// 节流
// 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
// 时间戳版本
function throttle(fn, delay) {
  let begin = 0;
  return function() {
    let now = Date.now();
    if(now - begin > delay) {
      fn.apply(this, arguments);
      begin = now;
    }
  }
}
// 定时器版本
function throttle1(fn, delay) {
  let timer = null;
  return function() {
    if(!timer){
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      },delay)
    }
  }
}
