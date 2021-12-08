const levelOrder = function(root) {
  // 结果集
  const result = [];
  // 如果结点为空
  if(root === null){
    return result;
  }
  // 利用队列
  const queue = [];
  // 将第一个放入栈中
  queue.push(root);
  while(queue.length){
    // 每一层次的结点数组
    const levelResult = [];
    // 当前层次结点的个数
    const nums = queue.length;
    // 遍历队列
    for(let i=0;i<nums;i++){
      // 当前出队列的结点
      const current = queue.shift();
      // （当前层次的结点）入结点数组
      levelResult.push(current.val);
      // 如果当前出队列的结点有左孩子 将它入队列
      if(current.left){
        queue.push(current.left);
      }
      // 如果当前出队列的结点有右孩子 将它入队列
      if(current.right){
        queue.push(current.right);
      }
    }
    // 放入结果集中
    result.push(levelResult);
  }
}
