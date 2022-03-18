import React, { useEffect,useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios' 
import Header from "./Header"


const Profile = () => {

    
    const [tokenn,setTokenn] = useState(localStorage.getItem('token'))
    
    const [usersA,setUsersA] = useState([])
    const [usersC,setUsersC] = useState([])
    const [usersE,setUsersE] = useState([])
    const [student,setStudent] = useState([])

    const [z,setZ] = useState(0)
    
    useEffect(()=>{

        axios.get('http://localhost:5000/myprofile',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(
            res => setStudent(res.data)
        )

    },[])

    const Handler = () =>{
        axios.get('http://localhost:5000/getuserA').then(
            res => setUsersA(res.data.filter(item => item.clgId === student.collegeId))
        )

        axios.get('http://localhost:5000/getuserC').then(
            res => setUsersC(res.data.filter(item => item.clgId === student.collegeId))
        )

        axios.get('http://localhost:5000/getuserE').then(
            res => setUsersE(res.data.filter(item => item.clgId === student.collegeId))
        )
        setZ(1)

    }

    return (
        <div>
            <center>
            <Header />
            <br />
            { z===0 ?
            <div>
            <h3 style={{color:"brown"}}>If you not register your seat, then visit Dashboard page to reserve your seat </h3>
            <h4 style={{color:"grey"}}>To know your allocated seat then click on show my details </h4>
            <button onClick={()=>Handler()} className="btn btn-primary"> Show My Details </button>
            </div>
            :
            <div>
            {student.collegeId && <h1 style={{color:"brown"}}>CollegeId : <span style={{color:"grey"}}> {student.collegeId} </span></h1> }
            {student.fullname && <h1 style={{color:"brown"}}>Name : <span style={{color:"grey"}}> {student.fullname} </span></h1> }
            {student.branch && <h1 style={{color:"brown"}}>Branch : <span style={{color:"grey"}}> {student.branch} </span></h1> }
            {student.email && <h1 style={{color:"brown"}}>Email : <span style={{color:"grey"}}> {student.email} </span></h1> }
            
            {usersA.length>=1 ? <h1 style={{color:"orange"}}>Seat Number : <span style={{color:"violet"}}>{usersA[0].seatno}</span><span style={{color:"grey"}}> seat is Allocated </span></h1> : null }
            {usersC.length>=1 ? <h1 style={{color:"orange"}}>Seat Number : <span style={{color:"violet"}}>{usersC[0].seatno}</span><span style={{color:"grey"}}> seat is Allocated </span></h1> : null }
            {usersE.length>=1 ? <h1 style={{color:"orange"}}>Seat Number : <span style={{color:"violet"}}>{usersE[0].seatno}</span><span style={{color:"grey"}}> seat is Allocated </span></h1> : null }
            {/* <button onClick={()=>console.log(users[0].seatno)}>check</button> */}
            
            {!usersA.length && !usersC.length && !usersE.length && <h2 style={{color:"red"}}>Seat is not yet reserved</h2>}
            </div>
            }



            </center>

            { tokenn === "undefined" && <Redirect to="/login" />}
        </div>
    )
}

export default Profile
