import { useMutation } from "@apollo/client"
import { ChangeEvent, useState } from "react"
import BoardCommentWriteUI from "./BoardCommentWrite.presenter"
import {
  CREATE_BOARD_COMMENT,
  // UPDATE_BOARD_COMMENT,
} from "./BoardCommentWrite.queries"
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries"
import { useRouter } from "next/router"

export default function BoardCommentWrite() {
  const router = useRouter()
  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [contents, setContents] = useState("")
  const [star, setStar] = useState(0)

  function onChangeWriter(event: ChangeEvent<HTMLInputElement>) {
    setWriter(event.target.value)
  }

  function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }

  function onChangeStar(event) {
    setStar(event.target.value)
    // console.log(event.target.value)
    // console.log(typeof event.target.value)
  }

  async function onClickWrite() {
    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating: Number(star),
          },
          boardId: String(router.query.id),
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: String(router.query.id) },
          },
        ],
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT)
  // const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT)

  return (
    <BoardCommentWriteUI
      contents={contents}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeStar={onChangeStar}
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
    />
  )
}
