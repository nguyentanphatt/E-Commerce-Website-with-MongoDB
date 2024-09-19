import React, { useState } from 'react'
import './css/LoginSign.css'

const LoginSign = () => {

  const [state, setState] = useState("Login")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })
  
  const changeHandler = (e) => {
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })
  }

  const login = async () => {
    console.log("Login", formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData) 
    }).then((res)=> res.json())
      .then((data)=>responseData=data)
    
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/")
    } else {
      alert(responseData.errors)
    }
  }
  const signup = async () => {
    console.log("SignUp", formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData) 
    }).then((res)=> res.json())
      .then((data)=>responseData=data)
    
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/")
    } else {
      alert(responseData.errors)
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==='Sign Up'?<input type="text" name="username" id="" placeholder='Your name' value={formData.username} onChange={changeHandler}/> : <></>}
          <input  type="email" name="email" id="" placeholder='Email Address' value={formData.email} onChange={changeHandler}/>
          <input  type="password" name='password' placeholder='Password' value={formData.password} onChange={changeHandler}/>
        </div>
        <button onClick={()=>{state==='Login'?login():signup()}}>Continue</button>
        {state==='Sign Up'?<p className="loginsignup-login">
          Already have an account? <span onClick={()=>{setState('Login')}}>Login here</span>
        </p> 
        : 
        <p className="loginsignup-login">
          Create an account? <span onClick={()=>{setState('Sign Up')}}>Click here</span>
        </p>
        }
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id=""/>
          <p>By Continuing, i agree to the term of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSign