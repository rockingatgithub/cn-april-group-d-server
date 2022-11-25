const express = require('express')
const db = require('./config/mongoose');
const Student = require('./models/student');
const PORT = 8000;

const app = express()

// app.use((req, res, next) => { console.log('URL', req.url); next() })
app.use(express.json())
app.use(express.urlencoded())

// CRUD using DB....

app.post('/db/addStudent', (req, res) => {

    console.log("the req.boby", req.body)
    Student.create(req.body, (err, doc) => {
        if(err){
            console.log("Error", err);
            return res.status(500).json({
                message: "Student not created!",
            })
        }
        return res.status(200).json({
            message: "Student created successfully!",
            data: doc
        })
    })

})

app.get('/db/getStudents', (req, res) => {

    Student.find({name: "CN"}, (err, doc) => {
        if(err){
            console.log("Error", err);
            return res.status(500).json({
                message: "Student not created!",
            })
        }
        return res.status(200).json({
            message: "Student created successfully!",
            data: doc
        })
    })

})

app.put('/db/updateStudent/:id', async (req, res) => {

    console.log(req.body)
    const student = await Student.findByIdAndUpdate(req.params.id, req.body)

    return res.status(200).json({
        message: "Student updated successfully!",
        data: student
    })

})



// CRUD using without Database... 

const students = [ 
    {
        name: 'abcd',
        roll: 12,
    },
    {
        name: 'abcde',
        roll: 13,
    },
    {
        name: 'abcdef',
        roll: 14,
    }
 ]

app.get('/getStudents', (req, res) => {

    return res.status(200).json({
        data: students
    })

})

app.post('/addStudent', (req, res) => {

    console.log(req.body)
    students.push(req.body)
    return res.status(200).json({
        data: students
    })

})

app.put('/updateStudent/:roll', (req, res) => {
    console.log(req.params.roll)
    const roll = parseInt(req.params.roll)

    // find the student roll, 

    const index =  students.findIndex((student) => student.roll === roll)
    if(index !== -1){
        students.splice(index, 1, req.body)
    }else {
        students.push(req.body)
    }

    return res.status(200).json({
        data: students
    })
})

app.delete('/deleteStudent', (req, res) => {
    console.log(req.query.roll)
    const roll = parseInt(req.query.roll)

    const  index = students.findIndex((student) => student.roll === roll)
    if(index !== -1){
        students.splice(index, 1)
    }

    return res.status(200).json({
        data: students
    })
})


app.listen(PORT, (err) => {
    if(err){
        console.log(err)
        return;
    }
    console.log("Server is running😀")
})