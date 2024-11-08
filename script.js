const express = require('express')
var auth = require('./authorization')
const path = require('path')
const app = express()

app.use(express.json())

tokens = []

app.post('/api/login', (req, res) => {
  let a = auth.auth(req.body["login"], req.body["password"])

  tokens.push(a)

  //console.log(tokens)

  res.status(200).json(a);
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.post('/home', (req, res) => {
  console.log(req.body["token"])

  res.sendFile(path.resolve(__dirname, 'client', 'home.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))