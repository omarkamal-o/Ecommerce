import React from 'react'
import style from './Home.module.css'
import MainSlider from '../../Components/MainSlider/MainSlider'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import Products from '../../Components/Products/Products'
import Loader from '../../Components/Loader/Loader'
import { Helmet } from 'react-helmet'
export default function Home() {
  return (
    <div className="container">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider/>
      <CategorySlider/>
      <Products/>
    </div>
  )
}
