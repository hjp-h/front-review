// 递归实现
var preorderTraversal = function(root) {
  // 定义结果
  const result = [];
  // 递归函数
  const dfs = function(node){
    if(!node){
        return;
      }
    result.push(node.val)  
    node.left && dfs(node.left); 
    node.right && dfs(node.right);
  }
  dfs(root);
  return result;
};

// 迭代法
/**
 * 跟层次遍历的思想差不多
 * 层次遍历的思想是先进先出（数据结构：队列 每一次出栈就把它的左孩子和右孩子入栈）
 * 
 * 而前序遍历就是利用栈 （根左右 ）
 * 根节点进栈 弹出栈 右孩子进栈 左孩子进栈
 * 
 */
var preorderTraversal = function(root) {
  const result = [];
  if(!root){
      return result;
  }
  const stack = [];
  stack.push(root);
  while(stack.length){
      const num = stack.length;
      for(let i=0;i<num;i++){
          const node = stack.pop();
          node.val && result.push(node.val);
          // 栈是先进后出 而前序遍历是根左右 所以先进右孩子 再进左孩子
          node.right && stack.push(node.right);
          node.left && stack.push(node.left);
      }
  }
  return result;
};
