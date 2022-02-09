import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import BoardListUI from "./BoardList.presenter"
import _ from "lodash"
import {
  FETCH_BOARDS,
  FETCH_BOARDS_BEST,
  FETCH_BOARDS_COUNT,
} from "./BoardList.queries"

import { v4 as uuidv4 } from "uuid"

export default function BoardList() {
  const router = useRouter()
  const { data, refetch } = useQuery(FETCH_BOARDS, { variables: { page: 1 } })
  const [keyword, setKeyWord] = useState("")
  const { data: bestListData } = useQuery(FETCH_BOARDS_BEST)
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT)
  const lastPage = Math.ceil(dataBoardsCount?.fetchBoardsCount / 10)

  const getDebounce = _.debounce((data) => {
    refetch({ search: data, page: 1 })
    setKeyWord(data)
  }, 500)

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value)
  }

  function onClickMoveToBoardNew() {
    router.push("/boards/new")
  }

  function onClickMoveToBoardDetail(event) {
    console.log(event.currentTarget.id)
    router.push(`/boards/${event.currentTarget.id}`)
  }

  return (
    <BoardListUI
      data={data}
      onClickMoveToBoardNew={onClickMoveToBoardNew}
      onClickMoveToBoardDetail={onClickMoveToBoardDetail}
      onChangeSearch={onChangeSearch}
      bestListData={bestListData}
      dataBoardsCount={dataBoardsCount}
      lastPage={lastPage}
      refetch={refetch}
      keyword={keyword}
      uuidv4={uuidv4}
    />
  )
}
