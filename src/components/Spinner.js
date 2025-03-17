import React, { useEffect, useState } from 'react'
import { BallTriangle } from "react-loader-spinner";
import { useNavigate ,useLocation} from 'react-router-dom';


const Spinner = ({path="login"}) => {
  // path  by default will be login if no prop is send by the user
    const navigate = useNavigate();
    const location = useLocation();
    const [count,setCount] = useState(3);
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prev)=> --prev)
        },1000)
        count === 0 &&  navigate(`/${path}`,{
            state:location.pathname
        })
        return ()=> clearInterval(interval);
    },[count,navigate,location,path])
  return (
    <div style={{ display: "flex" ,height:"100vh" , alignItems: "center",justifyContent:"center",flexDirection:"column"}}>
        <h1>Redirecting to you in {count} seconds</h1>
      <BallTriangle
        height={150}
        width={150}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Spinner