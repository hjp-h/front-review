// const bubbleSort = (arr) => {
//   var length = arr.length;
//   for(let i = 0; i < length-1; i++) {
//     for(let j = 0; j < length-i-1;j++)
//     {
//       if(a[j]>a[j+1]) {
//         let temp = a[j];
//         a[j] = a[j+1];
//         a[j+1] = temp;
//       }
//     }
//   }
// }
// let a = [3,1,2,4]
// bubbleSort(a);
// console.log(a)

let a = '12347856910123';
let result = '';
for(let i = 0; i < a.length-1;i+=3){
  for(let j = i; j <= i+2 ;j++){
    result += a[j];
  }
  result += ',';
  if(i+3>a.length-1){
    break;
  }
}
console.log(result)
