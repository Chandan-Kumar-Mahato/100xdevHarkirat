import React from 'react'
import axios from 'axios'
import {useState , useRef} from 'react';

function Login() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const emilRef = useRef();
    const passRef = useRef();

    const clearInput = ()=>{
        emilRef.current.value='';
        passRef.current.value='';
    }
    const handleAuth = ()=>{
        axios.post(`http://localhost:5000/` +"login" , {
            email:email,
            password:password
        })
        .then((res)=>{
            clearInput()
            alert(res.data);
        })
        .catch((res)=>{
            alert(`User Not found`);
        })
    }
  return (
    <div className="container  h-screen flex flex-col mt-20 items-center">
    <h1 className=' mb-2 text-2xl'>Login</h1>
    <div className="mainContainer p-4  flex flex-col w-1/3 h-2/4 shadow border bg-slate-400 rounded-md ">
        <input 
        className='outline-none mb-4 mt-4 p-2 rounded-lg border-2'
        type="text"
        placeholder='Enter your email' 
        required
        ref={emilRef}
        onChange={(e)=>{setEmail(e.target.value)}}
        />

        <input 
        className='border-2 mb-5 p-2 rounded-lg outline-none'
        type='password'
        placeholder='Enter your password'
        ref={passRef}
        onChange={(e)=>{setPassword(e.target.value)}}
        />

        <input
         className='bg-blue-600 p-2 text-white cursor-pointer rounded-lg mt-5 w-full mx-auto' 
            onClick={()=>handleAuth()}
         type="Submit"
         value={"Login"}
        />
        </div>
</div>
  )
}

export default Login