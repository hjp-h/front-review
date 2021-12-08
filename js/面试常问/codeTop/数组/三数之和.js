var threeSum = function(nums) {
  let len = nums.length;
  const result = [];
  if(len<3){
      return result;
  }
  //对nums进行排序
  nums.sort((a,b) =>a-b);
  for(let i=0;i<len;i++){
      if(nums[i]>0){
          // 排好序后 如果当前的项大于0 三数相加后结果肯定大于0 （从小到大排序）
          continue;
      }
      // 去重
      if(i>0 && nums[i]===nums[i-1]){
          continue;
      } 
      let l = i+1;
      let r = len-1;
      while(l<r){
          const sum = nums[i]+nums[l]+nums[r];
          if(sum === 0){
              result.push([nums[i],nums[l],nums[r]]);
              // 去重
              while(l<r && nums[l]===nums[l+1]){
                  l++;
              }
              while(l<r && nums[r]===nums[r-1]){
                  r--;
              }
              l++;
              r--;
          }
          else if(sum < 0){
             l++;
          }
          else if(sum>0){
             r--;
          }
      }
  }
  return result;
};