const express = require('express')
const PORT = 8000;

const app = express()

app.get('/', (req, res) => {
    return res.end("This is served by express")
})

app.get('/home', (req, res) => {
    return res.sendFile(__dirname + '/index.html')
})

app.get('/about', (req, res) => {
    return res.end("This is served by express, about!")
})


app.listen(PORT, (err) => {
    if(err){
        console.log(err)
        return;
    }
    console.log("Server is running😀")
})