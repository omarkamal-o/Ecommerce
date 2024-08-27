import { useContext, useEffect, useState } from 'react';
import { WishListContext } from '../../Context/WishListContext/WishListContext';
import { CartContext } from '../../Context/CartContext/CartContext'; 
import Loader from '../../Components/Loader/Loader';
import { toast } from 'react-toastify'; 
import { Helmet } from 'react-helmet';

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const { getWishList, deleteWishList } = useContext(WishListContext);
  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    async function fetchWishlist() {
      const { data } = await getWishList();
      setWishlist(data.data);
    }

    fetchWishlist();
  }, [getWishList]);

  const getShortTitle = (title) => {
    return title.split(' ').slice(0, 3).join(' ');
  };

  async function handleRemove(id) {
    await deleteWishList(id);
    setWishlist(wishlist.filter(item => item._id !== id));
  }

  async function handleAddToCart(id) {
    await addToCart(id); 
    toast.success('Product added to cart!'); 
  }

  return (
    <div className="container mx-auto my-12 bg-gray-100 p-6 rounded-lg shadow-lg">
            <Helmet>
        <title>Wish List</title>
      </Helmet>
      <h2 className='text-3xl font-bold mb-8 ms-5'>My Wish List</h2>
      <div className="space-y-8">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div key={product._id} className="flex items-start justify-between p-6 border border-gray-300 rounded-lg bg-white">
              <div className="flex items-center space-x-6">
                <img src={product.imageCover} alt={product.title} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className='text-xl font-semibold text-black'>{getShortTitle(product.title)}</h3>
                  <p className='text-green-600 mt-2'>{product.price} EGP</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <button 
                      onClick={() => handleRemove(product._id)} 
                      className="text-red-600 flex items-center">
                      <i className="fa-solid fa-trash me-2"></i> Remove
                    </button>
                    <div className="flex-1 flex justify-end">
                      <button 
                        onClick={() => handleAddToCart(product._id)} 
                        className="text-black px-6 py-2 rounded border border-green-500">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
        <div className=""></div>
        )}
      </div>
    </div>
  );
}
