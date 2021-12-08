// 后序遍历
const afterOrderTraversal = function(root){
  const result = [];
  const dfs = function(node){
    if(!node){
      return;
    }
    node.left && dfs(node.left);
    node.right && dfs(node.right);
    result.push(node.val)
  }
  return result;
}

// 迭代法
const afterOrderTraversal1 = function(root) {
  const result = [];
  if(!root){
      return result;
  }
  const stack = [];
  const outputStack = [];
  stack.push(root);
  while(stack.length){
      const node = stack.pop();
      // 根节点进栈 所有右孩子进栈 所有左孩子进栈
      outputStack.push(node)
      // 栈是先进后出 而前序遍历是根左右 所以先进右孩子 再进左孩子
      node.left && stack.push(node.left);
      node.right && stack.push(node.right); 
  }
  while(outputStack.length){
    const node = outputStack.pop();
    result.push(node.val);
  }
  return result;
};
