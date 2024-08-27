import  { useEffect, useState } from 'react'
import axios from 'axios'
import ProductItem from '../ProductItem/ProductItem';
import Loader from '../Loader/Loader';
import { Link} from 'react-router-dom';
export default function Products() {
  const [products, setProducts] = useState([])
  function getProducts() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products').then((data)=>setProducts(data.data.data)
    ).catch((error)=>console.log(error));
  }

useEffect(() => {
  getProducts();
}, [])


  return (
    <div className='row'>
      
      {
        products.length>0?
      
      
      products.map((product)=> (

          <ProductItem product={product}/>

      )):<Loader/>
    } 
    </div>
  )

}