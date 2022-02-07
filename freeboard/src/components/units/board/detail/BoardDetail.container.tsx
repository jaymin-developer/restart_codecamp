import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import BoardDetailUI from "./BoardDetail.presenter"
import { FETCH_BOARD, LIKE_BOARD, DISLIKE_BOARD } from "./BoardDetail.queries"
import {
  IQuery,
  IMutation,
  IMutationLikeBoardArgs,
  IMutationDislikeBoardArgs,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated"
// 왜 빨간줄이지..?

export default function BoardDetail() {
  const router = useRouter()
  const [likeClicked, setLikeClicked] = useState(false)
  const [disLikeClicked, setDisLikeClicked] = useState(false)

  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD)

  const [dislikeBoard] = useMutation<
    Pick<IMutation, "dislikeBoard">,
    IMutationDislikeBoardArgs
  >(DISLIKE_BOARD)

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    { variables: { boardId: String(router.query.id) } }
  )

  function isLikeClicked() {
    setLikeClicked((prev) => !prev)
    likeBoard({
      variables: { boardId: String(router.query.id) },
      refetchQueries: [
        { query: FETCH_BOARD, variables: { boardId: router.query.id } },
      ],
    })
  }

  function isDisLikeClicked() {
    setDisLikeClicked((prev) => !prev)
    dislikeBoard({
      variables: { boardId: String(router.query.id) },
      refetchQueries: [
        { query: FETCH_BOARD, variables: { boardId: router.query.id } },
      ],
    })
  }

  function onClickMoveToList() {
    router.push("/boards")
  }

  return (
    <BoardDetailUI
      data={data}
      likeClicked={likeClicked}
      disLikeClicked={disLikeClicked}
      isLikeClicked={isLikeClicked}
      isDisLikeClicked={isDisLikeClicked}
      onClickMoveToList={onClickMoveToList}
    />
  )
}
