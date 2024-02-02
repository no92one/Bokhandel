import { log } from "console";
import User from "../models/User.js";
import crypto from "crypto"
const salt = "paraplane"

function getHash(password) {
  let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
  return hash
}

export default function (server) {

  server.post("/api/users", async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        password: getHash(req.body.password)
      })
      const savedUser = await newUser.save()
      res.status(201).json(savedUser)
    } catch (err) {
      res.status(500).json({ message: "Något gick fel när vi i /api/users-routen" })
    }

  })

  server.post("/api/login", async (req, res) => {
    if (req.session.login) {
      res.json({ message: "Det finns redan en inloggad användare!" })
    } else {
      const user = await User.findOne({
        username: req.body.username,
        password: getHash(req.body.password)
      })

      if (user) {
        req.session.login = user._id
        res.json({ message: `Du har lyckats logga in som ${user.username}.` })
      } else {
        res.json({ message: "Hitta ingen användare. Fel användarnamn eller lösenord." })
      }
    }
  })

  server.delete("/api/login", async (req, res) => {
    if (req.session.login) {
      const user = await User.findById(req.session.login)
      delete req.session.login
      res.json({ message: `Hejdå ${user.username}! Du har loggat ut. Ha en fortsatt bra dag!` })
    } else {
      res.json({ message: "Går inte att logga ut när ingen är inloggad." })
    }
  })

}