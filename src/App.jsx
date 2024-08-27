import {createBrowserRouter, RouterProvider} from "react-router-dom"
import MainLayOut from './Pages/MainLayOut/MainLayOut'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import NotFound from './Pages/NotFound/NotFound'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import CounterContextProvider from "./Context/CounterContext/CounterContext"
import UserContextProvider from "./Context/UserContext/UserContext"
import ProtuctedRoute from "./Pages/ProtuctedRoute/ProtuctedRoute"
import { Offline} from "react-detect-offline";
import CartContextProvider from "./Context/CartContext/CartContext";
import WishListContextProvider from "./Context/WishListContext/WishListContext"
import 'react-toastify/dist/ReactToastify.css';
import  {Toaster} from 'react-hot-toast';
import { ToastContainer } from "react-toastify"
import Brands from "./Pages/Brands/Brands"
import Checkout from "./Pages/Checkout/Checkout"
import WishList from "./Pages/Wishlist/WishList"
import ProductsPage from "./Pages/Products/ProductsPage"
import Categories from "./Pages/Categories/Categories"
import BrandsContextProvider from "./Context/BrandsContext/BrandsContext"
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword"
import ResetPassword from "./Components/ResetPassword/ResetPassword"
function App() {
  let routers = createBrowserRouter([{
    path:'',
    element:<MainLayOut/>,
    children:[
      {index:true,element:<ProtuctedRoute>
        <Home/>
      </ProtuctedRoute>},
      {path:'cart',element:<ProtuctedRoute>
        <Cart/>
      </ProtuctedRoute>},
      {path:'brands',element:<ProtuctedRoute>
        <Brands/>
      </ProtuctedRoute>},
      {path:'wishlist',element:<ProtuctedRoute>
              <WishList/>
      </ProtuctedRoute>},
      {path:'products',element:<ProtuctedRoute>
      <ProductsPage/>
      </ProtuctedRoute>},
      {path:'categories',element:<ProtuctedRoute>
      <Categories/>
      </ProtuctedRoute>},
      {path:'allorders',element:<ProtuctedRoute>
      <Home/>
      </ProtuctedRoute>},
      {path:'checkout',element:<ProtuctedRoute>
      <Checkout/>
      </ProtuctedRoute>},
      {path:'productdetails/:id',element:<ProtuctedRoute>
        <ProductDetails/>
      </ProtuctedRoute>},
      {path:'login',element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'forgetpassword',element:<ForgetPassword/>},
      {path:'resetpassword',element:<ResetPassword/>},
      {path:'*',element:<ProtuctedRoute>
        <NotFound/>
      </ProtuctedRoute>},
    ]
  }])
  
  return (
    <BrandsContextProvider>
    <WishListContextProvider>
    <UserContextProvider>
    <CartContextProvider>
      <Offline>
        <div className="bg-red-100 absolute bottom-1 right-5 z-30 p-5">
          Only shown offline (surprise!)
        </div>
      </Offline>
      <Toaster/>
      <CounterContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <ToastContainer />
      </CounterContextProvider>
    </CartContextProvider>
  </UserContextProvider>
  </WishListContextProvider>
  </BrandsContextProvider>
  )
}

export default App