import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import BoardListUI from "./BoardList.presenter"
import { FETCH_BOARDS, FETCH_BOARDS_BEST } from "./BoardList.queries"

export default function BoardList() {
  const router = useRouter()
  const { data } = useQuery(FETCH_BOARDS)
  const { data: bestListData } = useQuery(FETCH_BOARDS_BEST)

  function onClickMoveToBoardNew() {
    router.push("/boards/new")
  }

  function onClickMoveToBoardDetail(event) {
    console.log(event.target.id)
    router.push(`/boards/${event.currentTarget.id}`)
  }

  return (
    <BoardListUI
      data={data}
      onClickMoveToBoardNew={onClickMoveToBoardNew}
      onClickMoveToBoardDetail={onClickMoveToBoardDetail}
      bestListData={bestListData}
    />
  )
}
