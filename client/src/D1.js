import React, { useEffect,useState } from 'react'
import { Redirect } from 'react-router-dom'


import Seatsdata from "./Seatsdata.json"

import axios from 'axios'
import Header from './Header'

const Dashboard = () => {
    
    const [tokenn,setTokenn] = useState(localStorage.getItem('token'))

    const [users,setUsers] = useState([])
    const [seats,setSeats] = useState([])
    const [student,setStudent] = useState(null)
    const [z,setZ] = useState(0)
    const [q,setQ] = useState(0)
    
    useEffect(()=>{


        axios.get('http://localhost:5000/getuser').then(
            res => setSeats(res.data)
        )

        axios.get('http://localhost:5000/myprofile',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(
            res => {  setStudent(res.data) }
        )

    },[])

    if(!localStorage.getItem('token')){
        return <Redirect to='/login' />
    }

    const ChangeHandler = index =>{
        alert(index+" seat is allocated successfully");
        // console.log(student.fullname)
        axios.post('http://localhost:5000/addUser',{clgId:student.collegeId,namee:student.fullname,password:student.password,seatno:index}).then(
            res => { console.log(res.data); setQ(1) }
        )

        
    }

    var seatnos = []
    const demoHandler = () =>{
        console.log(student)
        let i;
        
        let m;
        let n;
        let p;
        for(i=0;i<seats.length;i++){
            seatnos.push(seats[i].seatno)
        }
        console.log(seatnos);
        setZ(1)

        console.log(Seatsdata)

       

        for(m=0;m<seatnos.length;m++){
            for(n=0;n<Seatsdata.length;n++){
                for(p=0;p<Seatsdata[n].length;p++){
                    if(Seatsdata[n][p]===seatnos[m]){
                        console.log(seatnos[m]);
                        Seatsdata[n][p]="SB"
                    }
                }
            }
        }

        console.log(Seatsdata)
        
        axios.get('http://localhost:5000/getuser').then(
            res => setUsers(res.data.filter(item => item.clgId === student.collegeId))
        )

    }
    
    return (
        <div>
            <center>
                <Header />
                <br />


                { z===0 ? <div>
                        <h3 style={{color:"brown"}}>If you already register then visit profile page to see your allocated seat </h3>
                        <h4 style={{color:"grey"}}>If not registered then click on start button for selecting seat </h4>
                        <button onClick={demoHandler} className="btn btn-primary">Start</button>
                        </div> : null }

                { z===1 ?

                <div>
                <h1 style={{border:"2px solid black",margin:"10px 20px",backgroundColor:"violet",padding:"10px"}}>Stage / Screen</h1> <br />

                { Seatsdata.map((arrayy,index) =>
                    <div>
                    <div key={index} style={{flex:1,display:"inline-flex"}}>
                        
                        { arrayy.map((item,index) => 
                        <div>
                        
                            { item !== "SB" ?
                            <div>
                            <div style={{flex:1,border:"1px solid black",display:"inline-flex"}} key={index}>
                                 <button style={{color:"green"}} onClick={()=>{ ChangeHandler(item) }}>{item}</button>
                             </div>&nbsp;&nbsp;
                             </div>

                             :

                             <div>
                            <div style={{flex:1,border:"1px solid black",display:"inline-flex"}} key={index}>
                                 <button style={{backgroundColor:"red"}} onClick={()=>{ alert("Sorry, This seat is already Booked") }}>{item}</button>
                             </div>&nbsp;&nbsp;
                             </div>

                        }

                        </div>

                        
                        )}
                        
                    </div><br /><br />
                    </div>
                )}
                

                </div>

                :

                null }

            </center>


            {users.length>=1 && <Redirect to="/profile" /> }

            { q===1 && <Redirect to="/profile" /> }

            { tokenn === "undefined" && <Redirect to="/login" />}

            { tokenn === "undefinedddd" ? <div>{setTokenn("hey")}</div> : null }
            
        </div>
    )
}

export default Dashboard
