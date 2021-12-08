function myInstanceof(obj,fn){
  if(typeof obj !== "object" && obj === null){
    return false;
  }
  else{
    let left = obj.__proto__;
    let right = fn.prototype;
    while(left){
      if(left === right){
        return true;
      }
      left = left.__proto__;
    }
  }
  return false;
}
