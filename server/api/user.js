import User from "../models/User.js";

export default function (server) {

  server.post("/api/users", async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      })
      const savedUser = await newUser.save()
      res.status(201).json(savedUser)
    } catch (err) {
      res.status(500).json({ message: "Något gick fel när vi i /api/users-routen" })
    }

  })

  server.post("/api/login", async (req, res) => {
    // if (req.session.User)
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password
    })

    req.session.login = user._id
    res.json({ message: "Du har lyckats logga in." })

    res.json(user)
  })
}