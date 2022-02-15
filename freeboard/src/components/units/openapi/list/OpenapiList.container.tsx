import axios from "axios"
import { useEffect, useState } from "react"
import OpenapiListUI from "./OpenapiList.presenter"

export default function OpenapiList() {
  const Kakao = axios.create({
    baseURL: "https://dapi.kakao.com", // 공통 요청 경로를 지정해준다.
    headers: {
      Authorization: "KakaoAK {}",
    },
  })

  // search book api
  const bookSearch = (params) => {
    return Kakao.get("/v3/search/book", { params })
  }

  const [books, setBooks] = useState([])
  const [query, setQuery] = useState("")

  // 책 검색
  useEffect(() => {
    if (query.length > 0) {
      bookSearchHttpHandler(query, true) // 컴포넌트 마운트 후에, 함수를 호출한다.
    }
  }, [query])

  // book search 핸들러
  const bookSearchHttpHandler = async (query, reset) => {
    // Parameter 설정
    const params = {
      query: query,
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호
      size: 10, // 한 페이지에 보여 질 문서의 개수
    }

    const { data } = await bookSearch(params) // api 호출
    if (reset) {
      setBooks(data.documents)
    } else {
      setBooks(books.concat(data.documents))
    }
  }

  const searchBook = (text) => {
    setQuery(text)
  }

  return <OpenapiListUI imgUrls={imgUrls} />
}
