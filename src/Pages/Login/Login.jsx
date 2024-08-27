import style from './Login.module.css';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { userContext } from '../../Context/UserContext/UserContext';
import { Helmet } from 'react-helmet';
import Loader from '../../Components/Loader/Loader';


export default function Login() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUserToken } = useContext(userContext);

    let navigate = useNavigate();

    function handleLogin(values) {
        setIsLoading(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then((data) => {
            if (data.data.message === 'success') {
                setUserToken(data.data.token);
                localStorage.setItem('userToken', data.data.token);
                setIsLoading(false);
                navigate('/');
            }
        })
            .catch((error) => {
                setIsLoading(false);
                setError(error.response.data.message);
            });
    }

    let validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Invalid email address"),
        password: Yup.string().required("Password is required").matches(/^[0-9a-z]{3,9}$/, 'Password must be between 3 and 9 characters long and contain only letters and numbers'),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: handleLogin,
    });

    return (
        <div className='container'>
        <Helmet>
        <title>Login</title>
        </Helmet>
            <div className="w-3/4 mx-auto my-10">
                <h1 className={`${style.h1}`}>Login Now :</h1>
                <form className='my-5' onSubmit={formik.handleSubmit}>
                    {error ? <div className="bg-red-200 py-2">{error}</div> : null}
                    <div className="relative my-5">
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder=''
                            name='email'
                            type="email"
                            id="email"
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                        <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                        {formik.touched.email && formik.errors.email ? <div className="bg-red-200 py-2">{formik.errors.email}</div> : null}
                    </div>
                    <div className="relative my-5">
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder=''
                            name='password'
                            type="password"
                            id="password"
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
                        <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                        {formik.touched.password && formik.errors.password ? <div className="bg-red-200 py-2">{formik.errors.password}</div> : null}
                    </div>
                    <div className="flex justify-between">
                        <Link to={'/forgetpassword'} className={`${style.p}  cursor-pointer`}>forget your password ?</Link>
                    <button type='submit' className="btn bg-green-500 text-white w-16 h-8 rounded-md">
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
