import author from "./api/author.js";
import book from "./api/book.js"

export default function (server) {
  author(server)
  book(server)
}