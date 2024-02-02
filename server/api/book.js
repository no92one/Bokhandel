import Book from "../models/Book.js"
import Author from "../models/Author.js"

export default function (server) {

  server.get("/api/books", async (req, res) => {
    const books = await Book.find()
    res.json(books)
  })

  server.get("/api/books/:id", async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author")
    res.json(book)
  })

  server.post("/api/books", async (req, res) => {
    if (req.session.login) {
      try {
        const newBook = new Book({
          title: req.body.title,
          description: req.body.description,
          author: req.body.authorId
        })
        const savedBook = await newBook.save()

        const author = await Author.findById(req.body.authorId)
        author.books.push(newBook._id)
        await author.save()

        res.status(201).json(savedBook)
      } catch (err) {
        res.status(500).json({ message: "Något gick fel när vi i /api/books-routen" })
      }
    } else {
      res.json({ message: "Du måste logga in!" })
    }

  })

}