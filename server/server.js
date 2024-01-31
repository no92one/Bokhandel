import express from "express"
import mongoose from "mongoose"
import apiRegister from "./api-register.js"

const server = express()
const port = 3000

server.use(express.json())

mongoose.connect("mongodb+srv://linus:qwerty123456@cluster0.ng8b2fk.mongodb.net/Bokhandel")

apiRegister(server)

server.listen(port, () => {
  console.log(`Server open on http://localhost:${port}`)
})