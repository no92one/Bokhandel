import author from "./api/author.js";
import book from "./api/book.js"
import user from "./api/user.js";

export default function (server) {
  author(server)
  book(server)
  user(server)
}