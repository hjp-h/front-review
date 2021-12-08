// 1.将12000000.11 转换成 12,000,000.11
function foramat(number) {
  return number && number.replace(/(?!^)(?=(\d{3})+\.)/g,',')
}
console.log(foramat('12000000.11'))

function format2(number) {
  return Intl.NumberFormat().format(number)
}

console.log(format2('12000000.11'))

function format3(number) {
  // toLocaleString 是Number的方法
  return number.toLocaleString('en')
}
console.log(format3(12000000.11))
