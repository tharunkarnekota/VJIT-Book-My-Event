import React,{useState} from 'react'
import { Link,Redirect } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [auth,setAuth] = useState(false)
    const [data,seData] = useState({
        email : '',
        password : '',
    })
    const {email,password} = data
    const changeHandler = e =>{
        seData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',data).then(
        res => { if(res.data.length<=30){alert(res.data)}; localStorage.setItem('token',res.data.token);setAuth(true)}
        )
    }
    if(auth){
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
            
        <nav className="navbar bg-dark justify-content-left">
            <h1 style={{"marginLeft":"5px"}}>
                <Link to='/'>VJIT Book My Event</Link>
            </h1>
            <div className="justify-content-left" >
                <h5 >
                    <Link to="/register" className="btn btn-secondary" style={{margin:"12px"}}>Register</Link>
                    <Link to="/login" className="btn btn-secondary" >Login</Link>&nbsp;&nbsp;
                    
                </h5>
            </div>
            
        </nav>
            
            <section className="container">
                <h1 className="large " style={{"color":"orange","marginTop":"100px"}} >Sign In</h1>
                <p className="lead"><b>Sign into Your Account</b></p>
                <form onSubmit={submitHandler}>
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="email"    placeholder="Enter email"    name="email" value={email}   onChange={changeHandler} /><br /><br />
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="password" placeholder="Enter password" name="password" value={password} onChange={changeHandler} /><br /><br />
                    <input type="submit" className="btn btn-primary" value="login" />
                </form>
                <p>
                    Don't have any account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </div>
    )
}

export default Login
