// import { useRouter } from "next/router"
import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.container"
import BoardCommentList from "../../../src/components/units/boardCommnet/list/BoardCommentList.container"
import BoardCommentWrite from "../../../src/components/units/boardCommnet/write/BoardCommentWrite.container"
// import BoardCommentList from "../../../src/components/units/boardComment/list/BoardCommentList.container"
// import BoardCommentWrite from "../../../src/components/units/boardComment/write/BoardCommentWrite.container"

export default function BoardDetailPage() {
  return (
    <div>
      <BoardDetail />
      <BoardCommentWrite />
      <BoardCommentList />
    </div>
  )
}
