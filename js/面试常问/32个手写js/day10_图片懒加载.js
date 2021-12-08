// 图片懒加载的原理
/*
先把图片的src 赋值为空 真正的地址用data-src保存起来
等待图片出现在可视区域内时 （offsetTop < innerHeight + scrollTop）
将data-src的值赋值给src
*/
const lazyLoad = function (){
  // 获取所有的图片
  const imgList = document.getElementsByTagName("img");
  // 图片的个数
  const len = imgList.length;
  // 获取页面可视区域的高
  const innerHeight = document.body.clientHeight || document.documentElement.clientHeight;
  // 获取页面的滚动高度
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  // 遍历数组 进行是否进入可是区域的判断
  for(let i = 0; i < len; i++){
    const target = imgList[i];
    if(target.offsetTop < innerHeight + scrollTop){
      target.src = target.getAttribute('data-src');
    }
  }
}

lazyload();//首次加载别忘了显示图片
window.addEventListener('scroll', lazyload);
