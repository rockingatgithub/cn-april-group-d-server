const express = require('express')
const PORT = 8000;

const app = express()

app.use(express.json())
app.use(express.urlencoded())

// CRUD ... 

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


app.listen(PORT, (err) => {
    if(err){
        console.log(err)
        return;
    }
    console.log("Server is running😀")
})