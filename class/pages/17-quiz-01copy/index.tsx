import axios from "axios"
import styled from "@emotion/styled"
import { useEffect, useState } from "react"

const Row = styled.div`
  display: flex;
`

const Column = styled.div`
  width: 30%;
`

export default function OpenapiPage() {
  const [book, setBook] = useState()
  const [search, setSearch] = useState()

  const onChangeSearch = (event: any) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    async function fetchBook() {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject=${search}`
      )
      setBook(result?.data?.items)
    }
    fetchBook()
  }, [search])

  console.log(book)

  return (
    <div>
      <input onChange={onChangeSearch} type="text" defaultValue={search} />
      <div>오픈API 퀴즈!!</div>
      {book?.map((el: any) => (
        <Row key={el.id}>
          {console.log(el.id)}
          <Column>
            <img
              src={
                el.volumeInfo?.imageLinks
                  ? el.volumeInfo?.imageLinks.thumbnail
                  : "https://us.123rf.com/450wm/3t0n4k/3t0n4k1902/3t0n4k190200018/125360306-%EC%B1%85-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B8%B0%ED%98%B8-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%95%99%EC%8A%B5-%EA%B5%90%EC%9C%A1-%EC%84%9C%EC%A0%90-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6"
              }
            ></img>
          </Column>
          <Column> {el.volumeInfo?.title} </Column>
          <Column> {el.volumeInfo?.authors} </Column>
          <Column>
            <a href={el.volumeInfo?.previewLink}>도서 정보</a>{" "}
          </Column>
        </Row>
      ))}
    </div>
  )
}
