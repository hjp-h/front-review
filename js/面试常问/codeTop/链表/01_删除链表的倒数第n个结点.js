/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 // 计算当前链表的长度
 let size = function (head){
  if(head === null){
      return 0;
  }
  // 计数
  let count = 0;
  while(head !== null){
      count = count + 1;
      head = head.next; 
  }
  return count;
};
var removeNthFromEnd = function(head, n) {
  if(head === null){
      return;
  }
  let total = size(head);
  // 换成正着数的结点
  let startNth = total - n;
  // 当前的结点
  let curNode = head;
  if(startNth === 0){
      head = curNode.next;
  }else{
      let index = 0 ;
      let previous = null;
      // 找到要删除的结点
      while(index ++  < startNth){
          previous = curNode;
          curNode = curNode.next;
      }
      // 替换指向
      previous.next = curNode.next;
  }
  return head;

};
