const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')

const Student = require("./models/Student")


mongoose.connect(process.env.CONNECTIONSTRING).then(
    ()=>{
        console.log("Connected to DB Server")
    
        const app = express()
        app.use(bodyParser.json())   //Application level Middleware
        
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
        app.post('/student',(req,res)=>{
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
        app.patch('/student/:id',async(req,res)=>{
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
        app.delete('/student/:id',async(req,res)=>{
            const data = await Student.deleteOne({studentid:req.params.id})
            res.send(data)
        })
    
        app.listen(process.env.PORT,()=>{
            console.log("Server Started on port ",process.env.PORT)
        })
    }
)