import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductPageItem from '../../Components/ProductPageItem/ProductPageItem';
import Loader from '../../Components/Loader/Loader';
import { Helmet } from 'react-helmet';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function getProducts() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then((data) => setProducts(data.data.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto my-12">
            <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="flex justify-center">
        <input
          type="text"
          className="block w-2/3 md:w-1/2 lg:w-1/3 p-3 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-shadow shadow-sm"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      <div className="container mt-24">
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductPageItem key={product._id} product={product} />)
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
