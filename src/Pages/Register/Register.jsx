import style from './Register.module.css'
import {useFormik} from "formik"
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { Helmet } from 'react-helmet'
export default function Register() {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  function handleRegister(values) {
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).then((data)=>
     {
      if(data.data.message==='success'){
        setIsLoading(false)
        navigate('/login')
      } 
     }
    )
      .catch((error)=>{
        setIsLoading(false)
        setError(error.response.data.message)
      })
  }
 
  let validationSchema = Yup.object({
    name:Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    email:Yup.string().required("Email is required").email("Invalid email address"),
    password:Yup.string().required("Password is required").matches(/^[0-9a-z]{3,9}$/, 'Password must be between 3 and 9 characters long and contain only letters and numbers'),
    rePassword:Yup.string().required("Confirm password is required").oneOf([Yup.ref('password')],'Passwords must match'),
    phone:Yup.string().required("Phone number is required").matches(/^01[0-2]\d{1,8}$/, 'Phone number is not valid'),
  })

  const formik = useFormik({
    initialValues: {
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema,
    onSubmit:handleRegister,
  });

  return (
    <div className='container'>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-3/4 mx-auto my-10">
        <h1 className={`${style.h1}`}>Register Now :</h1>
        <form className='my-5' onSubmit={formik.handleSubmit}>

          {error ? <div className="bg-red-200 py-2">{error}</div>:null}

          <div className="relative my-5">
            <input 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.name} 
              placeholder='' 
              name='name' 
              type="text" 
              id="name" 
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>
            <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name</label>
            {formik.touched.name && formik.errors.name ? <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div> : null}
          </div>

          <div className="relative my-5">
            <input 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.email} 
              placeholder='' 
              name='email' 
              type="email" 
              id="email" 
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>
            <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
            {formik.touched.email && formik.errors.email ? <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div> : null}
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
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>
            <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
            {formik.touched.password && formik.errors.password ? <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div> : null}
          </div>

          <div className="relative my-5">
            <input 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.rePassword} 
              placeholder='' 
              name='rePassword' 
              type="password" 
              id="rePassword" 
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>
            <label htmlFor="rePassword" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm Password</label>
            {formik.touched.rePassword && formik.errors.rePassword ? <div className="text-red-600 text-sm mt-1">{formik.errors.rePassword}</div> : null}
          </div>

          <div className="relative my-5">
            <input 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.phone} 
              placeholder='' 
              name='phone' 
              type="tel" 
              id="phone" 
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>
            <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Phone</label>
            {formik.touched.phone && formik.errors.phone ? <div className="text-red-600 text-sm mt-1">{formik.errors.phone}</div> : null}
          </div>

          <button 
            type="submit" 
            disabled={!(formik.isValid && formik.dirty)}
            className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 ${!(formik.isValid && formik.dirty) ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isLoading?'loading...':'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
