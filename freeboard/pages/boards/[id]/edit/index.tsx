import { useQuery, gql } from "@apollo/client"
import { useRouter } from "next/router"
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../src/commons/types/generated/types"
import BoardWrite from "../../../../src/components/units/board/write/boardWrite.container"

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`

export default function BoardsEditPage() {
  const router = useRouter()

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    { variables: { boardId: String(router.query.id) } }
  )

  return <BoardWrite isEdit={true} data={data} />
}
