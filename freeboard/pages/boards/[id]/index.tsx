import { useRouter } from "next/router"
import BoardDetail from "../../../src/units/board/detail/boardDetail.contariner"
// import BoardCommentList from "../../../src/components/units/boardComment/list/BoardCommentList.container"
// import BoardCommentWrite from "../../../src/components/units/boardComment/write/BoardCommentWrite.container"

export default function BoardDetailPage() {
  const router = useRouter()
  console.log(router)
  return (
    <div>
      <BoardDetail />
    </div>
  )
}
