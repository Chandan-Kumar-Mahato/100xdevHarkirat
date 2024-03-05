import React from 'react'
import axios from 'axios'
import { useState , useEffect , useRef } from 'react'

function Signup() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const passRef = useRef();
    const confirmPassRef = useRef();
    const emilRef = useRef();

    const clearInputAfter = ()=>{
                passRef.current.value='';
                emilRef.current.value='';
                confirmPassRef.current.value='';
    }

        const handleAuth = () =>{
            if(password !== confirmPassword)
            {
                alert('Password does not match');
                clearInputAfter();
                return;
            }
            else 
            {
                axios.post(`http://localhost:5000/` +"signup"  , {
                    Email: email,
                    password: password
                  })
                  .then(function (response) {
                    clearInputAfter();
                    alert(response.data)
                  })
                  .catch(function (error) {
                    alert(`Error in server`);
                  });
            }
        }
  return (
    <div className="container  h-screen flex flex-col mt-20 items-center">
        <h1 className=' mb-2 text-2xl'>Signup</h1>
        <div className="mainContainer p-4  flex flex-col w-1/3 h-2/3 shadow border bg-slate-400 rounded-md ">
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
            className='border-2 p-2 outline-none rounded-lg'
            type='password'
            placeholder='Confirm your password'
            ref={confirmPassRef}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            />

            {/* this is for the button submition */}
         <input
         className='bg-blue-600 p-2 text-white cursor-pointer rounded-lg mt-5 w-full mx-auto' 
            onClick={()=>handleAuth(
            )}
         type="submit"
          />
          <p className='text-center mt-4 text-red-600'>Already have a account?</p>
        </div>
    </div>
  )
}

export default Signup