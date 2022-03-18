import React, { useEffect,useState } from 'react'
import { Redirect } from 'react-router-dom'


import SeatsdataA from "./SeatsdataA.json"
import SeatsdataC from "./SeatsdataC.json"
import SeatsdataE from "./SeatsdataE.json"

import axios from 'axios'
import Header from './Header'

const Dashboard = () => {
    
    const [tokenn,setTokenn] = useState(localStorage.getItem('token'))

    const [usersA,setUsersA] = useState([])
    const [usersC,setUsersC] = useState([])
    const [usersE,setUsersE] = useState([])

    const [seatsA,setSeatsA] = useState([])
    const [seatsC,setSeatsC] = useState([])
    const [seatsE,setSeatsE] = useState([])
    const [student,setStudent] = useState(null)
    const [z,setZ] = useState(0)
    const [q,setQ] = useState(0)
    const [auditoriumlist,setAuditoriumlist] = useState([])
    
    useEffect(()=>{


        axios.get('http://localhost:5000/getuserA').then(
            res => setSeatsA(res.data)
        )

        axios.get('http://localhost:5000/getuserC').then(
            res => setSeatsC(res.data)
        )

        axios.get('http://localhost:5000/getuserE').then(
            res => setSeatsE(res.data)
        )

        axios.get('http://localhost:5000/myprofile',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(
            res => {  setStudent(res.data) }
        )

        axios.get('http://localhost:5000/getauditorium').then(
            res => setAuditoriumlist(res.data)
        )

    },[])

    if(!localStorage.getItem('token')){
        return <Redirect to='/login' />
    }

    const AChangeHandler = index =>{
        alert(index+" seat is allocated successfully");
        // console.log(student.fullname)
        axios.post('http://localhost:5000/addUserA',{clgId:student.collegeId,namee:student.fullname,password:student.password,seatno:index}).then(
            res => { console.log(res.data); setQ(1) }
        )
 
    }

    const CChangeHandler = index =>{
        alert(index+" seat is allocated successfully");
        // console.log(student.fullname)
        axios.post('http://localhost:5000/addUserC',{clgId:student.collegeId,namee:student.fullname,password:student.password,seatno:index}).then(
            res => { console.log(res.data); setQ(1) }
        )
 
    }

    const EChangeHandler = index =>{
        alert(index+" seat is allocated successfully");
        // console.log(student.fullname)
        axios.post('http://localhost:5000/addUserE',{clgId:student.collegeId,namee:student.fullname,password:student.password,seatno:index}).then(
            res => { console.log(res.data); setQ(1) }
        )
 
    }

    var seatnosA = []
    const AdemoHandler = () =>{
        console.log(student)
        let i;
        let m;
        let n;
        let p;
        for(i=0;i<seatsA.length;i++){
            seatnosA.push(seatsA[i].seatno)
        }
        console.log(seatnosA);

        for(m=0;m<seatnosA.length;m++){
            for(n=0;n<SeatsdataA.length;n++){
                for(p=0;p<SeatsdataA[n].length;p++){
                    if(SeatsdataA[n][p]===seatnosA[m]){
                        console.log(seatnosA[m]);
                        SeatsdataA[n][p]="ASB"
                    }
                }
            }
        }
    }


    var seatnosC = []
    const CdemoHandler = () =>{
        console.log(student)
        let ii,mm,nn,pp;
        for(ii=0;ii<seatsC.length;ii++){
            seatnosC.push(seatsC[ii].seatno)
        }
        
        for(mm=0;mm<seatnosC.length;mm++){
            for(nn=0;nn<SeatsdataC.length;nn++){
                for(pp=0;pp<SeatsdataC[nn].length;pp++){
                    if(SeatsdataC[nn][pp]===seatnosC[mm]){
                        console.log(seatnosC[mm]);
                        SeatsdataC[nn][pp]="ASB"
                    }
                }
            }
        }
    }

    var seatnosE = []
    const EdemoHandler = () =>{
        console.log(student)
        let iii,mmm,nnn,ppp;
        for(iii=0;iii<seatsE.length;iii++){
            seatnosE.push(seatsE[iii].seatno)
        }
        
        for(mmm=0;mmm<seatnosE.length;mmm++){
            for(nnn=0;nnn<SeatsdataE.length;nnn++){
                for(ppp=0;ppp<SeatsdataE[nnn].length;ppp++){
                    if(SeatsdataE[nnn][ppp]===seatnosE[mmm]){
                        console.log(seatnosE[mmm]);
                        SeatsdataE[nnn][ppp]="ASB"
                    }
                }
            }
        }
    }

    
    
    
    const demoHandler = () =>{
        
        setZ(1)
        AdemoHandler()
        CdemoHandler()
        EdemoHandler();

        // console.log(SeatsdataA)
      
        console.log(student.collegeId)
        axios.get('http://localhost:5000/getuserA').then(
            res => setUsersA(res.data.filter(item => item.clgId.toString() === student.collegeId.toString()))
        )

        axios.get('http://localhost:5000/getuserC').then(
            res => setUsersC(res.data.filter(item => item.clgId === student.collegeId))
        )  
        
        axios.get('http://localhost:5000/getuserE').then(
            res => setUsersE(res.data.filter(item => item.clgId === student.collegeId))
        ) 

    }

    const AHandler = () =>{
        setZ(2)
    }

    const CHandler = () =>{
        setZ(3)
    }

    const EHandler = () =>{
        setZ(4)
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
                {auditoriumlist[0].a1 !== "-" ? <div><button onClick={AHandler} className='btn btn-success'>{auditoriumlist[0].a1} Block Auditorium</button><br /><br /></div> : null}
                {auditoriumlist[0].a2 !== "-" ? <div><button onClick={CHandler} className='btn btn-success'>{auditoriumlist[0].a2} Block Auditorium</button><br /><br /></div> : null}
                {auditoriumlist[0].a3 !== "-" ? <div><button onClick={EHandler} className='btn btn-success'>{auditoriumlist[0].a3} Block Auditorium</button><br /><br /></div> : null}
                </div>

                :

                null }

                {
                    z===2 ?
                    <div>
                        <h1 style={{border:"2px solid black",margin:"10px 20px",backgroundColor:"violet",padding:"10px"}}>Stage / Screen</h1> <br />

                        { SeatsdataA.map((arrayy,index) =>
                            <div>
                            <div key={index} style={{flex:1,display:"inline-flex"}}>
                                
                                { arrayy.map((item,index) => 
                                <div>
                                
                                    { item !== "ASB" ?
                                    <div>
                                    <div style={{flex:1,border:"1px solid black",display:"inline-flex"}} key={index}>
                                        <button style={{color:"green"}} onClick={()=>{ AChangeHandler(item) }}>{item}</button>
                                    </div>&nbsp;&nbsp;
                                    </div>

                                    :

                                    <div>
                                    <div style={{flex:1,border:"1px solid black",display:"inline-flex"}} key={index}>
                                        <button style={{backgroundColor:"red"}} onClick={()=>{ alert("Sorry, Already this Seat is Booked") }}>{item}</button>
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
                    null
                }

                {
                    z===3 ?
                    <div>
                        <h1 style={{border:"2px solid black",margin:"10px 20px",backgroundColor:"violet",padding:"10px"}}>Stage / Screen</h1> <br />

                        { SeatsdataC.map((arrayy,index) =>
                            <div>
                            <div key={index} style={{flex:1,display:"inline-flex"}}>
                                
                                { arrayy.map((item,index) => 
                                <div>
                                
                                    { item !== "ASB" ?
                                    <div>
                                    <div style={{flex:1,border:"1px solid black",display:"inline-flex"}} key={index}>
                                        <button style={{color:"green"}} onClick={()=>{ CChangeHandler(item) }}>{item}</button>
                                    </div>&nbsp;&nbsp;
                                    </div>

                                    :

                                    <div>
                                    <div style={{flex:1,border:"1px solid black",display:"inline-flex"}} key={index}>
                                        <button style={{backgroundColor:"red"}} onClick={()=>{ alert("Sorry, Already this Seat is Booked") }}>{item}</button>
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
                    null
                }

                {
                    z===4 ?
                    <div>
                        <h1 style={{border:"2px solid black",margin:"10px 20px",backgroundColor:"violet",padding:"10px"}}>Stage / Screen</h1> <br />

                        { SeatsdataE.map((arrayy,index) =>
                            <div>
                            <div key={index} style={{flex:1,display:"inline-flex"}}>
                                
                                { arrayy.map((item,index) => 
                                <div>
                                
                                    { item !== "ASB" ?
                                    <div>
                                    <div style={{flex:1,border:"1px solid black",display:"inline-flex"}} key={index}>
                                        <button style={{color:"green"}} onClick={()=>{ EChangeHandler(item) }}>{item}</button>
                                    </div>&nbsp;&nbsp;
                                    </div>

                                    :

                                    <div>
                                    <div style={{flex:1,border:"1px solid black",display:"inline-flex"}} key={index}>
                                        <button style={{backgroundColor:"red"}} onClick={()=>{ alert("Sorry, Already this Seat is Booked") }}>{item}</button>
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
                    null
                }

            </center>


            {usersA.length>=1 && <Redirect to="/profile" /> }
            {usersC.length>=1 && <Redirect to="/profile" /> }
            {usersE.length>=1 && <Redirect to="/profile" /> }

            { q===1 && <Redirect to="/profile" /> }

            { tokenn === "undefined" && <Redirect to="/login" />}

            { tokenn === "undefinedddd" ? <div>{setTokenn("hey")}</div> : null }
            
        </div>
    )
}

export default Dashboard
