import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';
import { useContext } from 'react';
import { counterContext } from '../../Context/CounterContext/CounterContext';
import { userContext } from '../../Context/UserContext/UserContext';
import { CartContext } from '../../Context/CartContext/CartContext';

export default function Navbar() {
    let { counter } = useContext(counterContext);
    const { userToken, setUserToken } = useContext(userContext);
    const { numOfCartItems } = useContext(CartContext);
    let navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function logout() {
        localStorage.removeItem('userToken');
        setUserToken(null);
        navigate('/login');
    }

    function goToCart() {
        navigate('/cart');
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <nav className={`${style.bgNavbar} dark:bg-gray-900`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Link to='' className="flex items-center space-x-3 rtl:space-x-reverse">
                        <i className={`fa-solid fa-cart-shopping ${style.navIcon}`} onClick={goToCart}></i>
                        <span className={`${style.navTitle}`}>fresh cart</span>
                    </Link>
                </div>

                <button
                    className={`inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-400 dark:focus:ring-gray-600 ${style.blackButton}`}
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <i className="fa-solid fa-bars text-xl"></i>
                </button>

                <div className={`w-full md:flex md:w-auto ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
                    <div className="flex flex-col md:flex-row flex-grow justify-center space-x-3 rtl:space-x-reverse">
                        {userToken && (
                            <>
                                <Link to={'/'} className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    Home
                                </Link>
                                <Link to={'/cart'} className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    Cart
                                </Link>
                                <Link to={'/wishlist'} className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    Wish List
                                </Link>
                                <Link to={'/products'} className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    Products
                                </Link>
                                <Link to={'/categories'} className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    Categories
                                </Link>
                                <Link to={'/brands'} className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    Brands
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Logout, Icons, and Cart */}
                    <div className={`flex flex-col md:flex-row items-center space-y-3 md:space-y-0 ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
                        {userToken && (
                            <>
                                <span className='relative mx-5 cursor-pointer' onClick={goToCart}>
                                    <i className='inline fa-solid fa-cart-shopping text-green-500 mx-2 text-xl'></i>
                                    <span className='absolute -top-2 right-0 text-white w-4 h-4 flex justify-center items-center bg-black rounded-full'>
                                        {numOfCartItems}
                                    </span>
                                </span>
                                <div className="flex space-x-2 rtl:space-x-reverse mb-3 md:mb-0">
                                    <Link to="#" className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-400">
                                        <i className='fa-brands fa-facebook'></i>
                                    </Link>
                                    <Link to="#" className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-400">
                                        <i className='fa-brands fa-instagram'></i>
                                    </Link>
                                    <Link to="#" className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-400">
                                        <i className='fa-brands fa-twitter'></i>
                                    </Link>
                                    <Link to="#" className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-400">
                                        <i className='fa-brands fa-youtube'></i>
                                    </Link>
                                </div>
                                <Link onClick={logout} to="login" className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Logout</Link>
                            </>
                        )}
                        {!userToken && (
                            <>
                                <Link to="login" className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Login</Link>
                                <Link to="register" className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
