import img1 from './../../assets/slider-image-1.jpeg'
import img2 from './../../assets/slider-image-2.jpeg'
import img3 from './../../assets/slider-image-3.jpeg'
import img4 from './../../assets/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1 ,
    arrows:false ,
    autoplay:true ,
    autoplaySpeed: 2000,
  }


  return (
    <div className="row">
      <div className="w-3/4">
      <Slider {...settings}>
      <img src={img4} alt="" className='w-full h-[400px]'/>
      <img src={img2} alt="" className='w-full h-[400px]'/>
      </Slider>
      </div>
      <div className="w-1/4">
      <div><img src={img1} alt="" className='h-[200px] w-full'/></div>
      <div><img src={img3} alt="" className='h-[200px] w-full'/></div>
      </div>
    </div>
  )
}
