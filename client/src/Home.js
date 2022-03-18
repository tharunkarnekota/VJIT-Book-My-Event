import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'

import Logo from './Logo'

const Home = () => {

    const [picture,setPicture] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/getposter').then(
            res => { res.data.length>=1 ? setPicture(res.data[res.data.length-1].pic) : setPicture() }
        )
    })
    return (
        <div>
            <center>

                <Logo />
                
                <section  style={{"marginTop":"10px"}}>
                    
                        <h1 style={{color:"#FF1B1C"}}><b>-: BOOK MY EVENT :-</b></h1>
                        
                        <p ><b>
                            create a student profile and select your seat for Event
                        </b></p>
                        <img src={picture} alt="Add Poster of the event" width="800px" height="500px" /><br /><br />
                        
                        <Link to='/register' className="btn btn-primary">Signup</Link>&nbsp;&nbsp;&nbsp;
                        <Link to='/login' className="btn btn-success">SignIn</Link>&nbsp;&nbsp;&nbsp;
                        <Link to='/admin' className="btn btn-info">Admin</Link><br /><br />
                </section>
            </center>
        </div>
        
    )
}

export default Home
