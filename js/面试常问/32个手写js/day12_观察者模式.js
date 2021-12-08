class Observer{
  constructor(cb){
    this.cb = cb;
  }
  // update方法
  update(){
    this.cb()
  }
}

class Subject{
  constructor(){
    this.observerList = [];
  }
  // 添加observer
  addObserver(observer){
    this.observerList.push(observer);
  }
  // 通知更新
  notify(){
    this.observerList.forEach(observer => {
      observer.update()
    });
  }
}
