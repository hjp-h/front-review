import request from "../request";
function getSwiperData(){
  return request({
    url:'/home/swiperdata'
  })
}
export {
  getSwiperData
}
