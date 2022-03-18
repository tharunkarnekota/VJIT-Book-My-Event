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