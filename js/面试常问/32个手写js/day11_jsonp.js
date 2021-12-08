function jsonp({url,params,callback}){
  return new Promise((resolve,reject) => {
    // 创建script标签
    let script = document.createElement('script');
    // 在全局创建一个callback的函数
    window[callback] = function(data) {
      resolve(data);
      document.body.removeChild(script);
    }
    // 参数数组
    params = {...params,callback};
    // paramsArr
    const paramsArr = [];
    // 将参数放入数组中
    for(let key in params){
      paramsArr.push(`${key}="${params[key]}"`)
    }
    script.src = `${url}?${paramsArr.join('&')}`;
  })
}

jsonp({
  url: 'http://localhost:3000/say',
  params
  : { wd: 'Iloveyou' },
  callback: 'show'
}).then(data => {
  console.log(data)
})

function jsonp({url,params,callback}){
  return new Promise((resolve,reject) => {
     // 创建script标签
    let script = document.createElement('script');
    // 创建全局函数
    window[callback] = function(data) {
      resolve(data);
      document.removeChild(script);
    }
    params = {...params,callback}
    let paramsArr = [];
    for(let key in params){
      paramsArr.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${paramsArr.join('&')}`
  })
}
