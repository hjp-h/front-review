class PubSub {
  // 构造函数
  constructor() {
    // 存放监听的事件类型及其对应的监听函数 {click:[fn1,fn2]}
    this.listeners = {};
  }

  // 接收 事件类型+监听函数
  // 将事件及监听函数放在listeners里面
  subscribe(type,callback) {
    // 如果没有这个事件 则添加这个事件
    if(!this.listeners[type]){
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  // 发射事件 事件类型加参数
  // 调用listenes中对应事件类型的所有函数
  publish(type,...args) {
    this.listeners[type].forEach(callback => {
      callback(...args)
    })
  }

  // 移除事件类型的某一个监听函数（监听者）
  unsubscribe(type, callback) {
    if(this.listeners[type]){
      // 利用数组中删除的方法 splice
      // 1.找出这个索引
      const targetIndex = this.listeners[type].indexOf(callback);
      if(targetIndex !== -1){
         // 2.从这个索引开始删除一位
        this.listeners[type].splice(targetIndex,1); 
      }
      if(this.listeners[type].length === 0){
        delete this.listeners[type];
      }
    }
  }

  // 移除这个事件对应的所有监听者
  unsubscribeAll(type){
    if(this.listeners[type]){
      delete this.listeners[type];
    }
  }
}
