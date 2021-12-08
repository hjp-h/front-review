// 中序遍历
const midOrderTraversal = function(root){
  const result = [];
  const dfs = function(node){
    if(!node){
      return;
    }
    node.left && dfs(node.left);
    result.push(node.val)
    node.right && dfs(node.right);
  }
}
