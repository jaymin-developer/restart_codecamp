import { useQuery, gql } from "@apollo/client"
import { ChangeEvent, MouseEvent, useState } from "react"
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../src/commons/types/generated/types"
import _ from "lodash"
import styled from "@emotion/styled"
import { v4 as uuidv4 } from "uuid"

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
    }
  }
`

interface Iprops {
  isMatched: boolean
}

const Word = styled.span`
  color: ${(props: Iprops) => (props.isMatched ? "red" : "black")};
`

export default function SearchPage() {
  const [search, setSearch] = useState("")
  const [keyword, setKeyWord] = useState("")

  // data는 글로벌 스테이트
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardArgs
  >(FETCH_BOARDS)

  // const onClickSearch = () => {
  //   refetch({ search: search, page: 1 });
  //   setKeyWord(search);
  // };

  const getDebounce = _.debounce((data) => {
    refetch({ search: data, page: 1 })
    setKeyWord(data)
  }, 500)

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value)
  }

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    if (event.target instanceof Element)
      refetch({ search: keyword, page: Number(event.target.id) })
  }

  return (
    <div>
      <h1>검색페이지</h1>
      검색어 입력 :<input type="text" onChange={onChangeSearch} />
      {/* <button onClick={onClickSearch}>검색</button> */}
      {data?.fetchBoards.map((el) => (
        <div key={el._id} onClick={onClick}>
          <span>작성자 {el.writer} : </span>
          <span>
            제목 :
            {el.title
              .replaceAll(keyword, `#$%${keyword}#$%`)
              .split("#$%")
              .map((el) => (
                <span key={uuidv4()}>
                  <Word isMatched={el === keyword}>{el}</Word>
                </span>
              ))}
          </span>
        </div>
      ))}
      {new Array(10).fill(1).map((_, index) => (
        <span key={uuidv4()} onClick={onClickPage} id={String(index + 1)}>
          {` ${index + 1} `}
        </span>
      ))}
    </div>
  )
}
