import { gql, useQuery } from "@apollo/client"
import { useState } from "react"

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
    }
  }
`

export default function PaginationPage() {
  const [startPage, setStartPage] = useState(1)
  const { data, refetch } = useQuery(FETCH_BOARDS, { variables: { page: 1 } })

  const onClickPage = (event) => {
    refetch({ page: Number(event.target.id) })
  }

  const onClockPrevPage = () => {
    setStartPage((prev) => prev - 10)
  }

  const onClockNextPage = () => {
    setStartPage((prev) => prev + 10)
  }

  return (
    <div>
      <h1>페이지네이션 연습!!!</h1>
      {data?.fetchBoards?.map((el) => (
        <div key={el._id}>
          {el.title} {el.writer}
        </div>
      ))}
      <span onClick={onClockPrevPage}> 이전 페이지 </span>
      {new Array(10).fill(1).map((_, index) => (
        <span
          key={index + startPage}
          onClick={onClickPage}
          id={String(index + startPage)}
        >
          {` ${index + startPage} `}
          {/* index는 0~9 */}
        </span>
      ))}
      <span onClick={onClockNextPage}> 다음 페이지 </span>
      {/* 
        <span onClick={onClickPage} id="1">1</span>
        <span onClick={onClickPage} id="2">2</span>
        <span onClick={onClickPage} id="3">3</span> 
      */}
    </div>
  )
}
