var permute = function(nums) {
  // 数组的长度
  const len = nums.length;
  // 存储每条路径的值的数组
  const path = [];
  // 存储标记路径的数组
  const routes = new Array(len).fill(false);
  // 结果数组
  const result = []
  const dfs = function(){
      if(path.length === len) {
          // 如果path的长度等于len 说明找到了问题的一个解
          result.push(path.slice());
          // 返回上一层
          return;
      }
      // 开始深度遍历
      for(let i = 0; i<len;i++){
          // 如果这条路径已经走过了 就走下一条路径（相当于不能出现两个1 1）
          if(routes[i]) continue;
          // 将当前的路径标记为走过
          routes[i] = true;
          // 将值放入path中
          path.push(nums[i]);
          // 继续向下走
          dfs();
          // 走到最底后 弹出路径中的值 等待下一轮（1开头走完之后 轮到2开头的了）
          path.pop();
          // 路径复原
          routes[i] = false;
      }
  }
  dfs();
  return result;
};
