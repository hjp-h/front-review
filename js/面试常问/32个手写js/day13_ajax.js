function ajax({method,url,params,callback}){
  method = method.toUpperCase();
  let post_params = null;
  let get_params = '';
  // xhr对象
  let xhr = new XMLHttpRequest();
  if(method === 'GET'){
    if(typeof params === 'object'){
      let paramsArr = [];
      for(let key in params){
        paramsArr.push(`${key}=${params[key]}`);
      }
      params = paramsArr.join('&');
    }
    get_params = `?${params}`
    xhr.open(method,url+get_params,false);
    xhr.send();
  }
  else{
    post_params = params;
    xhr.open(method,url,false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(post_params);
  }
  // 监听状态码的变化
  xhr.onreadystatechange = function(){
    if(xhr.readyState ===4 && xhr.status== 200){
      callback(xhr.responseText)
    }
  }
}
