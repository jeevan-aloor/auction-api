const express=require('express')
const {RegModel} =require("../Model/Registermodel")
var jwt = require("jsonwebtoken");
const { adminModel } = require('../Model/AdminLogin');

const RegisterRouter=express()

// get route 
RegisterRouter.get("/userregister",(req,res)=>{
    res.send("register")
})


// post if this user is present or not 
RegisterRouter.post("/exist",async (req,res)=>{
    const {email}=req.body 
    console.log(email,"addemail")
    try {
        let userPresent= await RegModel.find({email})
        // res.send(userPresent)
        if(userPresent.length==0){
            res.status(200).send("Email Not Exist")
        }else{
            res.status(200).send("Email Already Exist")
        }
        // if(userPresent==[]){
        //     res.status(400).send("Email Not Exist")
        // }else{
        //     res.status(200).send("This Email Already Exist")
        // }
        // res.send(userPresent)
        
        // console.log(userPresent)
        
    } catch (error) {
        console.log(error)
        
    }
    // res.send("Register Page")
})

//  post user sign up details add to DB
RegisterRouter.post("/register",async(req,res)=>{
    const {firstname,lastname,email,password}=req.body
    try {
        // bcrypt.hash(password, 5, async (err, secure_password) => {
        //     if(err){
        //         res.send(err)
        //     }else{
                // const user=new RegModel(req.body)
                const User=new RegModel({
                    firstname,
                    lastname,
                    email,
                    password
                })
                await User.save()
                res.send("added register data").status(200)
                console.log(User)

            // }

       
        // })
        
    } catch (error) {
        res.send("not added")
        console.log("error")
        
    }

})


// user login route 
RegisterRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    
    try {
        const data =await RegModel.find({email,password})
        // console.log(data,"data",email,password)
        if(data.length>0){
            // let values=data[0].password
            // bcrypt.compare(password, values, function(err, result) {
            //     console.log("com",password,values)
            //     console.log("res",result)
            //         if (password===values){ 
                        const token=jwt.sign({userID:"backend"},'malaktel')
                        // const token = jwt.sign({ course: "backend"}, "masai");
                        
                       
                        // console.log(token);
                        
                        
                        
                        // res.send("login done");
                        res.status(200).send("login done")
                        console.log(token)
                      

                        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODAwYWMzZDE4NTBjZjRhNWFlYzkwMCIsInVzZXIiOnsiX2lkIjoiNjQ4MDBhYzNkMTg1MGNmNGE1YWVjOTAwIiwiYWRkcmVzcyI6IjB4NkFkYmE1N2VFRDk4NWY0MDg4OTBmQzMwNmY0YjA0NUFlMURiMTBjMiIsIm5hbWUiOiJqZWV2YW4iLCJlbWFpbCI6ImplZXZhbkBnbWFpbC5jb20iLCJiaW8iOiJub29vbyBzb3JyeSIsImZvbGxvd2VycyI6W10sImZvbGxvd2luZyI6W10sIl9fdiI6MCwiaW1ncGF0aCI6Imh0dHBzOi8vaXdjLXVzZXItcHJvZmlsZS5zMy5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS8xNjg2MTEzMDgwNDY5LmpwZyJ9LCJpYXQiOjE2ODYxMzU4MjQsImV4cCI6MTY4NjIyMjIyNH0.RfX_7vdD-FXAHU1soYcFPLYKHanXs38aStiis7-XdD0

            // });
            

        }else{
            res.status(400).send("something went wrong")
            console.log("email or password wrong")
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).send("login not done")
        
    }

})


//  create new password using forget route
RegisterRouter.patch("/forget",async(req,res)=>{
    const {email,password}=req.body
    const payload={
        password:password
    }
    try {
        const data =await RegModel.find({email})
        if(data.length>0){
            let presntUser=await RegModel.findOneAndUpdate({email:email},payload)
            
            res.status(200).send("password changed succussfully")
            // console.log(presntUser)

        }else{
            res.send("email not registerd")

            console.log("this email is not registerd")
        }

        
    } catch (error) {
        res.status(400).send("not updated password")
        console.log(error)
        
    }

})

RegisterRouter.post("/adminlogin",async(req,res)=>{

    try {
        let data=new adminModel(req.body)
        await data.save()
        res.send("admin data added to db")
        
    } catch (error) {
        console.log(error)
        res.send("not added")
        
    }
})

RegisterRouter.post("/getadmindata",async(req,res)=>{
    let {email}=req.body

    try {
        let data=await adminModel.find({email})
        console.log(data)
        if(data.length>0){
            res.send("This user is admin").status(200)
        }else{
            res.send("This user is not admin").status(404)
        }
        // res.send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("error")
        
    }
})





module.exports={
    RegisterRouter
}