import { Navigate } from 'react-router-dom'

export default function ProtuctedRoute(props) {  
  if (localStorage.getItem('userToken')) {
    return props.children;
  }else{
    return <Navigate to={"/login"} />
  }

}