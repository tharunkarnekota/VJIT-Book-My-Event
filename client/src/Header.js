import React from 'react'
import { NavLink } from 'react-router-dom'


const Header = () => {
    return (
        <nav className="navbar bg-dark justify-content-center" style={{backgroundColor:"grey"}}>

            
            <li className="nav-link ">
                <NavLink to="/Dashboard" className="nav-link" activeClassName="btn btn-primary" activeStyle={{color:"white"}}>
                    Dashboard
                </NavLink>
            </li>
            <li className="nav-link ">
                <NavLink to="/profile" className="nav-link" activeClassName="btn btn-primary" activeStyle={{color:"white"}}>
                    Profile
                </NavLink>
            </li>
            <li className="nav-link">
                <NavLink to="/contact" className="nav-link" activeClassName="btn btn-primary" activeStyle={{color:"white"}}>
                    contact us
                </NavLink>
            </li>
            <li className="nav-link">
                <NavLink to="/login" onClick={()=>localStorage.clear()} className="nav-link" activeClassName="btn btn-primary">
                    Logout
                </NavLink>
            </li>
           

        </nav>
    )
}

export default Header
