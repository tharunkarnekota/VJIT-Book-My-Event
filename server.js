const express = require('express');
const mongoose = require('mongoose');
const users = require('./usermodel')
const jwt = require('jsonwebtoken');
const middleware = require('./middleware')
const cors = require('cors');
const poster = require('./poster')
const contactmodel = require('./contactmodel')
const supportteammodel = require('./supportteammodel')
const openregistermodel = require('./openregister')
const nexteventmodel = require('./nexteventmodel')
const yearmodel = require('./yearmodel')
const auditoriummodel = require('./auditoriummodel');
const seatmodelC = require('./seatmodelC');
const seatmodelA = require('./seatmodelA')
const seatmodelE = require('./seatmodelE')


const app = express();
mongoose.connect('mongodb+srv://tharunkarnekota:tharunkarnekota@cluster0.ci7wy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    ()=> console.log('Db connected..') 
)

app.use(express.json());
app.use(cors({origin:"*"}));


app.post('/register',async (req,res) =>{
    try{
        const { fullname,collegeId,branch,email,mobile,password,confirmpassword } = req.body;
        const exist = await users.findOne({email});
        if(exist){
            return res.status(200).send('user already registered')
        }
        const existId = await users.findOne({collegeId});
        if(existId){
            return res.status(200).send('this collegeID already registered')
        }
        if(password !== confirmpassword){
            return res.status(400).send('password invalid')
        }

        let newUser = new users({
            fullname,collegeId,branch,email,mobile,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('User Registered Successfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('register Server Error')
    }
})


app.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body;
        const exist = await users.findOne({email})
        if(!exist){
            return res.status(200).send('User not Exist plz register')
        }
        if(exist.password !== password){
            return res.status(200).send('password invalid')
        }
        let payload = {
            user : {
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return res.json({token})
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send('login Server Error')
    }
})


app.post('/addUserA',async(req,res) =>{
    const {clgId,namee,password,seatno} = req.body;
    try{
        const newUser = new seatmodelA({
            clgId,
            namee,
            password,
            seatno
        })
        await newUser.save();
        return res.json("suceessfully seat allocated")
    }
    catch(err){
        console.log(err)
    }
})


app.get('/getuserA',async(req,res)=>{
    try{
        let seats = await seatmodelA.find();
        return res.status(200).json(seats);
    }
    catch(err){
        console.log(err);
        return res.send("getuser server error")
    }
})



app.post('/addUserC',async(req,res) =>{
    const {clgId,namee,password,seatno} = req.body;
    try{
        const newUser = new seatmodelC({
            clgId,
            namee,
            password,
            seatno
        })
        await newUser.save();
        return res.json("suceessfully seat allocated")
    }
    catch(err){
        console.log(err)
    }
})



app.get('/getuserC',async(req,res)=>{
    try{
        
        let seats = await seatmodelC.find();
        return res.status(200).json(seats);
    }
    catch(err){
        console.log(err);
        return res.send("getuser server error")
    }
})




app.post('/addUserE',async(req,res) =>{
    const {clgId,namee,password,seatno} = req.body;
    try{
        const newUser = new seatmodelE({
            clgId,
            namee,
            password,
            seatno
        })
        await newUser.save();
        return res.json("suceessfully seat allocated")
    }
    catch(err){
        console.log(err)
    }
})



app.get('/getuserE',async(req,res)=>{
    try{
        
        let seats = await seatmodelE.find();
        return res.status(200).json(seats);
    }
    catch(err){
        console.log(err);
        return res.send("getuser server error")
    }
})


app.post('/addposter',async(req,res) =>{
    const {pic} = req.body; 
    try{
        const newPoster = new poster({
            pic
        })
        await newPoster.save();
        return res.json("suceessfully poster Updated")
    }
    catch(err){
        console.log(err)
    }
})


app.get('/getposter',async(req,res)=>{
    try{
        return res.json(await poster.find())
    }
    catch(err){
        console.log(err);
        return res.send("getuser server error")
    }
})



app.get('/myprofile',middleware, async (req,res)=>{
    try{
        let myprofile = await users.findById(req.user.id);
        return res.json(myprofile);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('myprofile Server Error')
    }
})






app.post('/addsupportteam',middleware,async(req,res)=>{
    try{
        const {name,clgid,position,mobile,email} = req.body;
        
        const newsupportteam = new supportteammodel({
            name,
            clgid,
            position,
            mobile,
            email
        })
        await newsupportteam.save();
        return res.status(200).send('team member saved successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addsupportteam Server Error ')
    }
})

app.get('/getsupportteam',async(req,res)=>{
    try{
        let projectts = await supportteammodel.find();
        if(projectts.length>=1){
            return res.status(200).json(projectts);
        }
        else{
            return res.status(200).json(projectts);
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getproject Server Error')
    }
})




app.put('/updatesupportteam/:id/:position',middleware,async(req,res)=>{
    try{
        const updated = await supportteammodel.findByIdAndUpdate(req.params.id,{
            
            position : req.params.position || "leader",
            
        })
        return res.status(200).json(updated);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatesupportteam Server Error')
    }
})



app.put('/updatesupportteam/:id',middleware,async(req,res)=>{
    try{

        const updated = await supportteammodel.findByIdAndUpdate(req.params.id,{
            name : req.body.name || "rock star",
            clgid : req.body.clgid || "19911A0000",
            position : req.body.position || "leader",
            mobile : req.body.mobile || "1234512345",
            email : req.body.email || "t@gmail.com"
        })

        return res.status(200).json(updated);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatesupportteam Server Error')
    }
})




app.get('/getpresentuser',middleware,async(req,res)=>{
    try{
        const exist = await users.findById(req.user.id)
        return res.status(200).json(exist.collegeId);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getpresentuser Server Error')
    }
})



app.post('/addnextevent',async(req,res)=>{
    try{
        const {nextevent} = req.body; 
        const newnextevent = new nexteventmodel({
            nextevent
        })
        await newnextevent.save();
        return res.status(200).send('next event updated successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addnextevent Server Error')
    }
})

app.get('/getnextevent',async(req,res)=>{
    try{
        const exist = await nexteventmodel.find()
        return res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getnextevent Server Error')
    }
})

app.put('/updatenextevent/:id/:nextevent',async(req,res)=>{
    try{
        const updated = await nexteventmodel.findByIdAndUpdate(req.params.id,{
            
            nextevent : req.params.nextevent || "No Events",
            
        })
        return res.status(200).send("Updated next event succesfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('closeregister Server Error')
    }
})




app.post('/addyears',async(req,res)=>{
    try{
        const {year1,year2,year3,year4} = req.body; 
        const newyear = new yearmodel({
            year1,
            year2,
            year3,
            year4
        })
        await newyear.save();
        return res.status(200).send('batches updated successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addyears Server Error')
    }
})


app.get('/getyears',async(req,res)=>{
    try{
        const exist = await yearmodel.find()
        
        return res.status(200).json(exist);
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getyears server error')
    }
})


app.put('/updateyears/:id',async(req,res)=>{
    try{
        const {year1,year2,year3,year4} = req.body;
        const updated = await yearmodel.findByIdAndUpdate(req.params.id,{
            
            year1 : year1 || "-",
            year2 : year2 || "-",
            year3 : year3 || "-",
            year4 : year4 || "-"
            
        })
        return res.status(200).send("Updated years succesfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('closeregister Server Error')
    }
})


app.delete('/deleteyears/:id',async(req,res) => {
    try{
        const deletedyears = await yearmodel.findByIdAndDelete(req.params.id)
        return res.status(200).send('deleted successfully')
    }
    catch(err){
        console.log(err)
    }
})





app.post('/addopenregister',async(req,res)=>{
    try{
        const {dummy} = req.body; 
        const newopenregister = new openregistermodel({
            dummy
        })
        await newopenregister.save();
        return res.status(200).send('registration opened successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addopenregister Server Error')
    }
})

app.get('/getopenregister',async(req,res)=>{
    try{
        const exist = await openregistermodel.find()
        return res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getopenregister Server Error')
    }
})

// app.put('/closeregister/:id/:num',async(req,res)=>{
//     try{
//         const updated = await openregistermodel.findByIdAndUpdate(req.params.id,{
            
//             dummy : req.params.num || "1",
            
//         })
//         return res.status(200).json(updated);
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).send('closeregister Server Error')
//     }
// })
//



app.delete('/deletecloseregister/:id',async(req,res) => {
    try{
        const deletedregister = await openregistermodel.findByIdAndDelete(req.params.id)
        return res.status(200).send('closed registration successfully')
    }
    catch(err){
        console.log(err)
    }
})



app.post('/addauditorium',async(req,res)=>{
    try{
        const {a1,a2,a3} = req.body;
        
        const newauditorium = new auditoriummodel({
            a1,
            a2,
            a3
        })
        await newauditorium.save();
        return res.status(200).send('Auditorium Added successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('auditorium Server Error')
    }
})


app.get('/getauditorium',async(req,res)=>{
    try{
        const allauditoriums = await auditoriummodel.find()
        return res.status(200).json(allauditoriums);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getauditorium Server Error')
    }
})

app.put('/updateauditorium/:id',async(req,res)=>{
    try{
        const {a1,a2,a3} = req.body;
        const updated = await auditoriummodel.findByIdAndUpdate(req.params.id,{
            
            a1 : a1 || "-",
            a2 : a2 || "-",
            a3 : a3 || "-",
            
        })
        return res.status(200).send("Updated Auditorium succesfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updateauditorium Server Error')
    }
})



app.delete('/deleteauditorium/:id',async(req,res) => {
    try{
        const deletedproblem = await auditoriummodel.findByIdAndDelete(req.params.id)
        return res.status(200).send('deleted Auditoriums successfully')
    }
    catch(err){
        console.log(err)
    }
})


app.post('/addquery',middleware,async(req,res)=>{
    try{
        const {problem} = req.body;
        const exist = await users.findById(req.user.id)
        const newquery = new contactmodel({
            userid : exist.id,
            username : exist.fullname,
            clgid : exist.collegeId,
            problem
        })
        await newquery.save();
        return res.status(200).send('your problem sent successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('requirements Server Error')
    }
})

app.get('/getquery',async(req,res)=>{
    try{
        const allproblems = await contactmodel.find()
        return res.status(200).json(allproblems);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('requirements Server Error')
    }
})


app.delete('/deleteproblem/:id',async(req,res) => {
    try{
        const deletedproblem = await contactmodel.findByIdAndDelete(req.params.id)
        return res.status(200).send('deleted successfully')
    }
    catch(err){
        console.log(err)
    }
})

app.listen(5000,()=> console.log('Server is Running..'))