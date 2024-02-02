import express from "express"
import mongoose from "mongoose"
import session from "express-session"
import apiRegister from "./api-register.js"

const server = express()
const port = 3000

server.use(express.json())
server.use(session({
  secret: 'ditt_hemliga_tangent', // en hemlig nyckel för att signera session-cookie
  resave: false, // undviker att spara sessionen om den inte ändras
  saveUninitialized: true, // spara en ny session som inte har blivit initialiserad
  cookie: { secure: false } // cookie-inställningar, secure bör vara true i produktion med HTTPS
}))

mongoose.connect("mongodb+srv://linus:qwerty123456@cluster0.ng8b2fk.mongodb.net/Bokhandel")

apiRegister(server)

server.listen(port, () => {
  console.log(`Server open on http://localhost:${port}`)
})