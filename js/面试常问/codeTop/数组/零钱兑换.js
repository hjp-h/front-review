// 动态规划
const coinChange = function(coins,amount) {
  // 硬币数组的个数
  const num = coins.length;
  // 动态规划数组
  const f = new Array(amount).fill(Infinity);
  // 初始值
  f[0] = 0;
  for(let i=0;i<num;i++){
    for(let j=coins[i];j<=amount;j++){
      // 动态规划 核心思想 要么是当前的解 要么是子问题的解
      // 子问题的解就是当前f(amount-coins[i]) + 1(当前这枚硬币)
      f[j] = Math.min(f[j],f[j-coins[i]]+1);
    }
  }
  return f[amount] === Infinity ? -1 : f[amount]
}
