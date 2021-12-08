// 链表的结点类
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
// 链表类
class LinkedList {
  constructor() {
    // 1.初始化链表的长度
    this.length = 0;
    this.head = null;
  }
  // 判空
  isEmpty() {
    return this.length === 0;
  }
  // 个数
  size(){
    return this.length;
  }
  // toString
  toString() {
    let current = this.head;
    let result = ''
    while (current){
      result += current.data + (current.next ? ' --> ' : '')
      current = current.next;
    }
    return result;
  }
  // 在尾部添加结点
  append(data) {
    // 创建结点
    let newNode = new Node(data);
    // 1.如果链表为空 直接让头指针指向即可
    if(this.head === null) {
      this.head = newNode;
    }else{
      // 2.如果链表不为空 就要找到链表的最后一个结点在哪儿 将最后一个结点的next指向新结点
      // 当前结点
      let current = this.head;
      // 循环条件 当next指向结点不为null时 说明不是最后一个结点 否则是最后一个结点
      while(current.next){
        current = current.next;
      }
      // 最后一个结点的next指向新结点即可
      current.next = newNode;
    }
    this.length ++;
  }

  // 在某个位置插入结点
  insert(data,position){
    // 只能在[0,length]之间插入
    if(position > -1 && position <= this.length){
       // 创建结点
      let newNode = new Node(data);
      // 如果是插入的位置是第一个结点 
      if(position === 0){
        newNode.next = this.head;
        this.head = newNode;
      }else{
        // 如果不是第一个位置 那么我们要找到previous（插入位置前的结点） 和 current（原来位置的结点）
        let index = 0;
        let previous = null;
        let current = this.head;
        // 寻找原来所处位置为position的结点
        while(index ++ < postion){
          previous = current;
          current = current.next;
        }
        // 循环结束即找到了原来的结点
        previous.next = newNode;
        newNode.next = current;
      }
      this.length ++;
      return true;
    }else{
      return false;
    }
  }

  // 根据索引删除结点
  removeAt(position){
    if(position > -1 && position < this.length){
      let index = 0;
      let current = this.head;
      // 删除的是第一个位置
      if(position === 0){
        this.head = current.next;
      }
      else{
         // 找结点
        let previous = null;
        while(index++ < position){
          previous = current;
          current = current.next;
        }
         // 替换指向
         previous.next = current.next;
      }
      // 链表长度减一
      this.length--;
      // 返回删除的元素
      return current.data;
    }
    else{
      return null;
    }
  }
  // 根据结点的值找结点的索引
  find(data){
    let index = 0;
    let current = this.head;
    // 是否找到的标志
    let flag = false;
    while(current){
      // 找到了
      if(current.data === data){
        flag = true;
        return index;
      }
      index++;
      current = current.next;
    }
    // 没有找到
    if(!flag){
      return -1;
    }
  }
  // 删除数据为data的结点
  remove(data){
    // 找到索引对应的下标
    const index = this.find(data);
    // 根据下标删除节点
    return this.removeAt(index);
  }
}

// 反转链表（迭代）
var reverseList = function(head) {
  // 当前的指针
  let curNode = head;
  // 前一个指针
  let preNode = null;
  while(curNode){
      // 保存下一个指针
      let nextNode = curNode.next;
      // 指向前一个结点
      curNode.next = preNode;
      // preNode下移
      preNode = curNode;
      // curNode下移
      curNode = nextNode;
  }
  return preNode
};

// 反转链表递归 
const reverseNode1 = function(head){
  // 如果当前结点为空 或者 当前结点的下一个结点为空
  if(head === null || head.next === null){
    return head;
  }
  // 递归查找（直到倒数第一个结点，弹出栈，往前执行）
  const newHead = reverseNode1(head.next);
  // n1 -> ... -> n(k-1) -> n(k) -> n(k+1) <- ... <- n(m)
  // （反转）让当前结点的下一个结点 指向 当前结点
  head.next.next = head;
  // (防止生成环) 让当前结点的下一个结点指向null
  head.next = null;
  // 返回新的结点
  return newHead;
}
