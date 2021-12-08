var lengthOfLongestSubstring = function(s) {
  if(s === ""){
      return 0;
  }
  if(s.length === 1){
     return 1;         
  }
  // 存放多组结果的数组
  const result = [];
  // 存放扫描过的字符
  const scanArr = [];
  // 每一轮无重复字符的长度
  let maxLen = 0;
  // 每一轮开始的索引
  let start = 0;
  // 开始扫描
  for(let i=0;i<s.length;i++){
      // 如果扫描的数组中不包含当前字符
      if(!scanArr.includes(s[i])){
          // 将当前扫描的字符存入scanArr中
          scanArr.push(s[i]);
          maxLen ++;
          
          // 一直都是这个分支结束时，要pushmaxlen
          if(i === s.length-1){
              result.push(maxLen);
          }
      }else{
          // 包含当前的字符
          // 1.将maxLen存入result,然后将其清零
          result.push(maxLen);
          maxLen = 0;
          // 2.scanArr清空
          scanArr.splice(0,scanArr.length);
          // 3.将上一次开始的字符的下一个放入scanArr
          i = ++start;
          scanArr.push(s[i]);
          // 4.maxLen+1
          maxLen ++;
      }
  }
  // 将result排序
  result.sort((a,b) =>  b-a);
  console.log(result)
  return result[0];
};
console.log(lengthOfLongestSubstring("alqebriavxoo"))
