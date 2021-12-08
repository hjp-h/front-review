const arr = [1,5,6,4,3];
// js自带的排序
// console.log(arr.sort((a,b) => {
//   // 默认升序 return a-b
//   return b-a; // 降序
// }))

// 交换函数
const swap = function(a,b){
  let temp = a;
  a = b;
  b = temp;
}
// 冒泡排序
// const bubbleSort = function(arr) {
 //     //外层循环是数组长度减一 外循环一次就选出一个最大的数 总共的次数是数据长度-1
//   for(let i = 0; i < arr.length-1;i++) {
 //      //i+j+1要小于数组长度 为每趟比较次数
//     for(let j=0;j< arr.length-1-i;j++){
//       if(arr[j]>arr[j+1]){
//         // swap(arr[j],arr[j+1]);
//         [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
//       }
//     }
//   }
//   return arr;
// }
// console.log(bubbleSort(arr))

// 时间复杂度 O(n²)  空间复杂度O(1) 稳定

// 选择排序
// const selectSort = function (arr){
//   let minIndex;
//   for(let i=0; i<arr.length-1; i++){
//     // 默认选择第i个为最小元素
//     minIndex = i;
//     // 遍历这个元素后面是否有比它小的元素
//     for(let j=i+1;j<arr.length;j++){
//       if(arr[j]<arr[minIndex]){
//         // 记录最小索引所在的位置
//         minIndex = j;
//       }
//     }
//     // 如果最小的索引不为i了 说明找到了新的最小数
//     if(minIndex !== i){
//       [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];
//     }
//   }
//   return arr;
// }
// console.log(selectSort(arr));
// 时间复杂度 O(n²) 空间复杂度 O(1) 不稳定（相等的两个数 在排序后换了顺序）

// 插入排序
// const insertSort = function(arr) {
//   for(let i = 1; i < arr.length; i++) {
//     // arr[i] 为基准元素
//     let temp = arr[i];
//     let j;
//     // temp前面是排好序的了 不能直接arr[j-1] > arr[i] 因为arr[i]可能被改变了
//     for(j=i; j>0 && arr[j-1] > temp; j--){
//       arr[j] = arr[j-1];
//     }
//     arr[j] = temp;
//   }
//   return arr;
// }
// console.log(insertSort(arr))

 
// 时间复杂度O(n²)  空间复杂度 O(1)  稳定排序

// 快速排序
// const quickSort = function(arr,left,right) {
//   if(left < right){
//     let p = partition(arr,left,right);
//     // 左边
//     quickSort(arr,left,p-1);
//     // 右边
//     quickSort(arr,p+1,right);
//   }
//   return arr;
// }
// // 分隔 找出基准数 使得基准数左边的数 都比它小 右边的数都比它大
// const partition = function(arr,left,right) {
//   // 定义基准的数 默认最右边的数是基准的数
//   let temp = arr[left]; //比较时可以用temp 交换时要用a[left]
//   // 定义左右的游标 i，j
//   let i = left;
//   let j = right+1;
//   while(true){
//     // 当i<j 并且 i所指向的那个数比temp小的时候 i向右走 否则停下来
//     while (arr[++i]<=temp && i<j);
//     // 当j所指向的那个数比temp大的时候 j向左走 否则停下来
//     // 为什么不判断J>0 因为一直往左走的话 当j=0时 必然等于temp 跳出循环 
//     while(arr[--j]>temp);
//     // 如果i,j相遇 ， 跳出循环
//     if(i>=j){
//       break;
//     }
//     // 交换i，j对应的值
//     [arr[i], arr[j]] = [arr[j],arr[i]];
//   }
//   // 交换基准元素与i或j的对应的值
//   [arr[j],arr[left]] = [arr[left],arr[j]]
//   return j;
// }

// console.log(quickSort(arr,0,arr.length-1))
// 时间复杂度 O(nlogn) 最坏O(n²)

// 归并排序
// 思想：
/*
分解（Divide）：将n个元素分成个含n/2个元素的子序列。
解决（Conquer）：用合并排序法对两个子序列递归的排序。
合并（Combine）：合并两个已排序的子序列已得到排序结果。
*/
/**
 * 
 * @param  arr 数组本身
 * @param  left 最左边的索引
 * @param  right 最右边的索引
 * @param  temp 临时数组
 */
// function mergeSort(arr,left,right,temp) {
//   // 首先将数组分成两部分
//   let middle = Number.parseInt((left+right) / 2);
//   if(left < right){
//     // 左边划分
//     mergeSort(arr,left,middle,temp);
//     // 右边划分
//     mergeSort(arr,middle+1,right,temp);
//     // 合并
//     merge(arr,left,middle,right,temp);
//   }
//   return arr;
// }
// function merge(arr,left,middle,right,temp){
//   // 合并两个数组 第一个数组的开始索引 l 第二个数组的开始索引r
//   // 数组的左边索引
//   let l = left;
//   // 数组的右边索引
//   let r = middle+1;
//   // 临时数组存放的指针t
//   let t = 0;
//   // 左边和右边比较 谁小就放进临时数组
//   while((l<=middle) && (r<=right)){
//     if(arr[l]<=arr[r]){
//       // 左边比右边的小
//       temp[t++] = arr[l++];
//     }else{
//       // 右边的小
//       temp[t++] = arr[r++];
//     }
//   }
//   // 当左边的数组有剩余的时候
//   while(l <= middle){
//     temp[t++] = arr[l++];
//   }
//   // 当右边的数组有剩余
//   while(r <= right){
//     temp[t++] = arr[r++];
//   }
//   // 将temp数组 拷贝回arr
//   t = 0;
//   while(left<=right){
//     arr[left++] = temp[t++];
//   }
// }
// console.log(mergeSort(arr,0,arr.length-1,[]));

//时间复杂度 O(nlogn) 空间复杂度O(1) 稳定
// 思想：
// 1.首先建堆，建立成大顶堆（升序） 小顶堆（降序）  ==> 从左到右 下到上
// 2.将堆顶元素和最后一个元素交换
// 3.调整堆  ==> 从上到下 左到右
// 重复 2,3

// function heapSort(arr){
//   if(!Array.isArray(arr) || !arr.length){
//     throw new Error('type error,params should be an array')
//   }
//   // 建堆
//   buildHeap(arr);
//   // 数组的长度
//   let len = arr.length;
//   // 将堆得第一个元素和最后一个元素交换 然后调整堆 继续这个过程
//   while(len>1){
//     // 交换
//     [arr[0],arr[len-1]] = [arr[len-1],arr[0]];
//     // 数组长度-1
//     len--;
//     // 调整堆
//     heapfy(arr,0,len);
//   }
//   return arr;
// }
// function buildHeap(arr){
//   // 最后一个非叶子结点
//   const index = Number.parseInt(arr.length/2)-1;
//   for(let i=index; i>=0; i--){
//     // 建堆
//     heapfy(arr,i,arr.length);
//   }
// }
// function heapfy(arr,i,len){
//   while(true){
//     const leftChild = 2*i + 1;
//     const rightChild = 2*i + 2;
//     let maxPosition = i;
//     // 非叶子结点和它的左孩子比较
//     if(leftChild < len && arr[leftChild] > arr[maxPosition]){
//       maxPosition = leftChild;
//     }
//     // 非叶子结点和它的右孩子比较
//     if(rightChild < len && arr[rightChild] > arr[maxPosition]){
//       maxPosition = rightChild;
//     }
//     // 如果已经是大顶堆 跳出循环
//     if(maxPosition === i){
//       break;
//     }
//     //交换i,maxPosition的所对应的值
//     [arr[i],arr[maxPosition]] = [arr[maxPosition],arr[i]];
//   }
// }
// console.log(heapSort(arr));
