import { createContext, useState } from 'react';
import axios from 'axios';

export const WishListContext = createContext();

let headers = { token: localStorage.getItem('userToken') };

export default function WishListContextProvider(props) {
  const [wishlist, setWishlist] = useState([]);

  function addToWishList(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers })
      .then((data) => {
        setWishlist(prevWishlist => [...prevWishlist, data.data.product]);
        return data;
      })
      .catch((err) => err);
  }

  function deleteWishList(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
      .then(() => {
        setWishlist(prevWishlist => prevWishlist.filter(product => product._id !== id));
      })
      .catch((err) => err);
  }

  function getWishList() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
      .then((data) => {
        setWishlist(data.data.data);
        return data;
      })
      .catch((err) => err);
  }

  return (
    <WishListContext.Provider value={{ addToWishList, getWishList, wishlist, deleteWishList }}>
      {props.children}
    </WishListContext.Provider>
  );
}
