import { useQuery, gql } from "@apollo/client"
import { ChangeEvent, MouseEvent, useState } from "react"
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../mento/codecamp-frontend-05/class/src/commons/types/generated/types"

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
    }
  }
`

export default function SearchPage() {
  const [search, setSearch] = useState("")
  const [keyword, setKeyWord] = useState("")

  // data는 글로벌 스테이트
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardArgs
  >(FETCH_BOARDS)

  const onClickSearch = () => {
    refetch({ search: search, page: 1 })
    // setKeyWord(search)
  }

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  // const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
  //   if (event.target instanceof Element)
  //     refetch({ search: keyword, page: Number(event.target.id) })
  // }

  return (
    <div>
      <h1>검색페이지</h1>
      검색어 입력 :<input type="text" onChange={onChangeSearch} />
      <button onClick={onClickSearch}>검색</button>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>작성자 {el.writer} : </span>
          <span>제목 {el.title}</span>
        </div>
      ))}
      {new Array(10).fill(1).map((_, index) => (
        <span
          key={index + 1}
          // onClick={onClickPage}
          id={String(index + 1)}
        >
          {` ${index + 1} `}
        </span>
      ))}
    </div>
  )
}
