import Author from "../models/Author.js"

export default function (server) {

  server.get("/api/authors", async (req, res) => {
    const authors = await Author.find()
    res.json(authors)
  })

  server.post("/api/authors", async (req, res) => {
    try {
      const newAuthor = new Author({
        name: req.body.name,
        age: req.body.age
      })
      const savedAuthor = await newAuthor.save()
      res.status(201).json(savedAuthor)
    } catch (err) {
      res.status(500).json({ message: "Något gick fel när vi i /api/authors-routen" })
    }

  })

}