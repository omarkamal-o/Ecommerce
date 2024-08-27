  import { useContext } from 'react';
  import { CartContext } from '../../Context/CartContext/CartContext';
  import { WishListContext } from '../../Context/WishListContext/WishListContext';
  import { Link } from 'react-router-dom';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  export default function ProductItem({ product }) {
    const { addToCart, setNumOfCartItems } = useContext(CartContext);
    const { addToWishList } = useContext(WishListContext);

    async function addProduct(id) {
      let { data } = await addToCart(id);
      setNumOfCartItems(data?.numOfCartItems);
      toast.success(data?.message, {
        position: 'top-right'
      });
    }

    async function handleAddToWishList(id) {
      let { data } = await addToWishList(id);
      toast.success("Product added to wishlist!", {
        position: 'top-right'
      });
    }

    return (
      <div className='w-full p-4 md:w-1/3 lg:w-1/6 inner product relative p-2 py-6'>
        <Link to={`productdetails/${product._id}`} key={product._id}>
          <img src={product.imageCover} alt="" />
          <p className='text-green-600 mt-2'>{product.category.name}</p>
          <h6 className='font-bold my-3'>{product.title.split(' ').slice(0, 2).join(' ')}</h6>
          <div className="row justify-between">
            <p className='text-black'>{product.price} EGP</p>
            <div className="text-slate-500">
              <i className='fa-solid fa-star text-yellow-400'></i>
              <span>{product.ratingsAverage}</span>
            </div>
          </div>
        </Link>
        <div className="flex justify-end cursor-pointer" onClick={() => handleAddToWishList(product._id)}>
          <i className="fa-solid fa-heart text-2xl my-2"></i>
        </div>
        <button 
          onClick={() => { addProduct(product._id) }} 
          className='bg-green-600 px-2 rounded text-white absolute bottom-0 btn mx-10'>
          + Add
        </button>
      </div>
    );
  }
