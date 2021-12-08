const minPathSum = function(grid){
  // 数组的行数
  const row = grid.length;
  // 数组的列数
  const col = gird[0].length;
  // 结果数组
  const dp = new Array(row).fill(null).map(() => new Array(col).fill(0));
  // 初始化
  // 1.如果是处于第一列 它只能往上走
  for(let i=0;i<row;i++){
    dp[i][0] = i===0 ? grid[i][0] : dp[i-1][0]+grid[i][0];
  }
  // 2.如果是处于第一行 它只能往左走
  for(let j=0;j<col;j++){
    dp[0][j] = j==0 ? grid[0][j] : dp[0][j-1]+grid[0][j];
  }
  for(let i=1;i<row;i++){
    for(let j=1;j<col;j++){
      // 在向左走和向上走之间去最小值 + grid[i][j]
      dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1])+grid[i][j]
    }
  }
  return dp[row-1][col-1];
}
