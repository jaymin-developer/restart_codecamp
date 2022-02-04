import axios from "axios"
import { useEffect, useState } from "react"

export default function OpenapiPage() {
  const [book, setBook] = useState()

  useEffect(() => {
    async function fetchBook() {
      const result = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=subject=주식"
      )
      console.log(result.data.items[0].volumeInfo.imageLinks.thumbnail)
      setBook(result.data.items[0].volumeInfo.imageLinks.thumbnail)
    }
    fetchBook()
  }, [])

  return (
    <div>
      <div>오픈API 퀴즈!!</div>
      <img src={book} />
      {/* <button onClick={()}></button> */}
    </div>
  )
}
