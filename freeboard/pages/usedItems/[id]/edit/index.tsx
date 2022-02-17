// import { useQuery, gql } from "@apollo/client"
// import { useRouter } from "next/router"
// import {
//   IQuery,
//   IQueryFetchBoardArgs,
// } from "../../../../src/commons/types/generated/types"
// import BoardWrite from "../../../../src/components/units/board/write/BoardWrite.container"

import UsedItemWrite from "../../../../src/components/units/usedItem/write/usedItemWrite.container"

// const FETCH_BOARD = gql`
//   query fetchBoard($boardId: ID!) {
//     fetchBoard(boardId: $boardId) {
//       writer
//       title
//       contents
//       youtubeUrl
//       boardAddress {
//         zipcode
//         address
//         addressDetail
//       }
//       images
//     }
//   }
// `

export default function UsedItemEditPage() {
  //   const router = useRouter()

  //   const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
  //     FETCH_BOARD,
  //     { variables: { boardId: String(router.query.aaa) } }
  //   )

  return (
    <UsedItemWrite
      isEdit={true}
      //   data={data}
    />
  )
}
