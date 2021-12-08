// 递归
var sumOfLeftLeaves = function(root) {
  let sum = 0;
  //判断它是否是叶子结点
  const isLeave = node => (!node.left) && (!node.right);
  const dfs = function(node){
      if(!node || isLeave(node)){
          return;
      }
      // 如果左孩子存在 并且是叶子结点
      if(node.left && isLeave(node.left)){
          sum += node.left.val;
      }
      // 递归左子树
      dfs(node.left);
      // 递归右子树
      dfs(node.right);
  }
  dfs(root);
  return sum
};

// 迭代
var sumOfLeftLeaves = function(root) {
  let sum = 0;
  //判断它是否是叶子结点
  const isLeave = node => (!node.left) && (!node.right);
  // 队列
  const queue = [];
  queue.push(root);
  // 队列层次遍历（出队时把他的左孩子右孩子加入队列） 
  // 找到它的每一个结点 如果是左节点并且数叶子结点 则加上该节点的值
  while(queue.length){
      const node = queue.shift();
      if(node.left && isLeave(node.left)){
          sum += node.left.val;
      }
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
  }
  return sum
};

