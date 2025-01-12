const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Student = require("./models/Student")


mongoose.connect(process.env.CONNECTIONSTRING).then(
    ()=>{
        console.log("Connected to DB Server")
    
        const app = express()
        app.use(bodyParser.json())  //Application level Middleware

        app.use('/students',(req,res,next)=>{
            
            try{
                var decode = jwt.verify(req.headers.authorization.split(' ')[1],'1234')
                next()
                
            }
            catch(err){
               res.status(401).send({err:"Unauthorized"}) 
            }
            
            
        })
        
        //Login api
        app.get('/login',(req,res)=>{
            const data = User.findOne({userEmail:req.body.userEmail,userPassword:req.body.userPassword})
            const credentials = data['_conditions']
            if(data!=null && data != {}){
                const token = jwt.sign(credentials,'1234')
                res.status(200).send(token)
            }
            else{
                res.status(401).send("Unauthorized User")
            }
            
        })

        //get All Students api
        app.get('/students',async(req,res)=>{
            const data = await Student.find();
            res.send(data)
        }) 
        
        //get Student by id
        app.get('/students/:id',async(req,res)=>{
            const data = await Student.findOne({studentid:req.params.id})
            res.send(data)
        })

        //Insert (Create) Student Api
        app.post('/students',(req,res)=>{
            const obj = new Student({
                studentid:req.body.studentid,
                studentName:req.body.studentName,
                studentDept:req.body.studentDept,
                studentSpi:req.body.studentSpi,
                studentEmail:req.body.studentEmail,
                studentMobile:req.body.studentMobile,
            })
            const data = obj.save()
            res.send(data)
        })

        // Update Student api
        app.patch('/students/:id',async(req,res)=>{
            const student = await Student.findOne({studentid:req.params.id})
            student.studentName = req.body.studentName
            student.studentDept = req.body.studentDept
            student.studentSpi = req.body.studentSpi
            student.studentEmail = req.body.studentEmail
            student.studentMobile = req.body.studentMobile

            const data = student.save()
            res.send(data)
        })
        
        // Delete Api
        app.delete('/students/:id',async(req,res)=>{
            const data = await Student.deleteOne({studentid:req.params.id})
            res.send(data)
        })
    
        app.listen(process.env.PORT,()=>{
            console.log("Server Started on port ",process.env.PORT)
        })
    }
)