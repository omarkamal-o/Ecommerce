import axios from 'axios'
import { useEffect, useState } from 'react';
import Slider from "react-slick";
export default function CategorySlider() {
  const [categories, setCategories] = useState([])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1 ,
    arrows:false ,
    autoplay:true ,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((data)=>setCategories(data.data.data)
    ).catch((error)=>console.log(error));
  }
  useEffect(() => {
    getCategories();
  }, [])
  
  return (
    <div  className='my-5 py-4'>
      <h2 className='text-2xl font-bold mb-2'>Shop Popular Categories</h2>
      {" "}
      <Slider {...settings}>
        {categories.map((category)=>
        <div className='h-[250px]' key={category._id}>
          <img src={category.image} className='h-full px-2' alt="" />
          <h2>{category.name}</h2>
        </div>
        )}
    </Slider>
    </div>
  )
}
