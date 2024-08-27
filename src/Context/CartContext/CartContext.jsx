import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

let headers = { token: localStorage.getItem('userToken') };

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  function addToCart(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
        productId
      }, {
        headers
      }).then((data) => {
        getCartNumbers();
        return data;
        }).catch((err) => err);
    }

  function getLoggedCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers
      }).then((data) => {
        setCartId(data.data.cartId);
        return data;
      }).catch((err) => err);
  }

  function deleteSpecificItem(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers,
      }).then((data) => {
        getCartNumbers();
        return data;
      }).catch((err) => err);
  }
  
  function updateProducts(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        count: count
      }, { headers }).then((data) => {
        getCartNumbers();
        return data;
      }).catch((err) => err);
  }

  async function getCartNumbers() {
    let { data } = await getLoggedCart();
    setNumOfCartItems(data.numOfCartItems);
  }

  function onlinePayment(shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, // استخدام cartId من الحالة
      { shippingAddress }, {
        headers,
        params: { url: "http://localhost:5173" },
      }).then((data) => data).catch((err) => err);
  }

  useEffect(() => {
    getCartNumbers();
  }, []);

  return (
    <CartContext.Provider value={{ onlinePayment, addToCart, getLoggedCart, deleteSpecificItem, setNumOfCartItems, updateProducts, numOfCartItems }}>
      {props.children}
    </CartContext.Provider>
  );
}
