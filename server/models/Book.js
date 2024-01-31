import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "authors" }
})

const Book = mongoose.model("books", bookSchema)

export default Book