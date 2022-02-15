import { useMutation } from "@apollo/client"
import { ChangeEvent, useState } from "react"
import BoardCommentWriteUI from "./BoardCommentWrite.presenter"
import {
  CREATE_BOARD_COMMENT,
  UPDATE_BOARD_COMMENT,
} from "./BoardCommentWrite.queries"
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries"
import { useRouter } from "next/router"

export default function BoardCommentWrite(props) {
  const router = useRouter()
  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [contents, setContents] = useState("")
  const [star, setStar] = useState(0)

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT)
  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT)

  function onChangeWriter(event: ChangeEvent<HTMLInputElement>) {
    setWriter(event.target.value)
  }

  function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }

  function onChangeStar(value) {
    setStar(value)
    // console.log(event.target.value)
    // console.log(typeof event.target.value)
  }

  async function onClickWrite() {
    if (writer && password && contents) {
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
    } else {
      alert("누락된 내용이 있는지 확인해주세요.")
    }
  }

  async function onClickUpdate() {
    if (!contents) {
      alert("내용이 수정되지 않았습니다.")
      return
    }
    if (!password) {
      alert("비밀번호가 입력되지 않았습니다.")
      return
    }

    try {
      // if (!props.el?._id) return;

      const updateBoardCommentInput = {}
      if (contents) updateBoardCommentInput.contents = contents
      if (star !== props.el.rating) updateBoardCommentInput.rating = star

      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password: password,
          boardCommentId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.id },
          },
        ],
      })
      props.setIsEdit(false)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <BoardCommentWriteUI
      contents={contents}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeStar={onChangeStar}
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      onClickUpdate={onClickUpdate}
      isEdit={props.isEdit}
      setIsEdit={props.setIsEdit}
      el={props.el}
    />
  )
}
