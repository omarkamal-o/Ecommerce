import { useFormik } from "formik";
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { CartContext } from "../../Context/CartContext/CartContext";

export default function Checkout() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    const { onlinePayment, getLoggedCart } = useContext(CartContext);

    async function handlePayment(values) {
        setIsLoading(true);     
        const { data } = await onlinePayment(values); 
        console.log(data);
        window.location.href = data.session.url;
    }

    let validationSchema = Yup.object({
        details: Yup.string().required(),
        city: Yup.string().required(),
        phone: Yup.string().required("Phone number is required").matches(/^01[0-2]\d{1,8}$/, 'Phone number is not valid'),
    });

    const formik = useFormik({
        initialValues: {
            details: "",
            city: "", 
            phone: "",
        },
        validationSchema,
        onSubmit: handlePayment,
    });

    return (
        <div className='container'>
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <div className="w-3/4 mx-auto my-10">
                <h1 className="font-bold text-2xl text-blue-600">Checkout Now :</h1>
                <form className='my-5' onSubmit={formik.handleSubmit}>
                    {error ? <div className="bg-red-200 py-2">{error}</div> : null}
                    <div className="relative my-5">
                        <input 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values.details} 
                            name='details' 
                            type="text" 
                            id="details" 
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        />
                        <label htmlFor="details" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                            Details
                        </label>
                        {formik.touched.details && formik.errors.details ? <div className="text-red-600 text-sm mt-1">{formik.errors.details}</div> : null}
                    </div>

                    <div className="relative my-5">
                        <input 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values.city} 
                            name='city' 
                            type="text" 
                            id="city" 
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        />
                        <label htmlFor="city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                            City
                        </label>
                        {formik.touched.city && formik.errors.city ? <div className="text-red-600 text-sm mt-1">{formik.errors.city}</div> : null}
                    </div>
  
                    <div className="relative my-5">
                        <input 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values.phone} 
                            name='phone' 
                            type="tel" 
                            id="phone" 
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        />
                        <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                            Phone
                        </label>
                        {formik.touched.phone && formik.errors.phone ? <div className="text-red-600 text-sm mt-1">{formik.errors.phone}</div> : null}
                    </div>
  
                    <button 
                        type="submit" 
                        className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800`}
                    >
                        {isLoading ? 'loading...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}
