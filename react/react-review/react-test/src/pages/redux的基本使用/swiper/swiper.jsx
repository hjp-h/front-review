import React,{useEffect,memo} from 'react'
import {connect} from 'react-redux'
import { Carousel } from 'antd';
import {getSwiperAction} from './store/actions'
const contentStyle = {
  height: '200px',
  // width: '300px'
};
function Swiper(props) {
  useEffect(() => {
    console.log('111')
    props.getSwiper();
    
  },[])
  return (
    <div>
      <Carousel autoplay>
        <div>
        { 
          props.swiper.map((item,index) => (
            <img style={contentStyle} src={item.image_src} alt=""/>
          ))
        }
        </div>
      </Carousel>
    </div>
  )
}
const mapStateToProps = (state) => ({
  swiper:state.swiper
})
const mapDispatchToProps = (dispatch) => ({
  getSwiper: () => dispatch(getSwiperAction())
})
export default connect(mapStateToProps,mapDispatchToProps)(memo(Swiper));
