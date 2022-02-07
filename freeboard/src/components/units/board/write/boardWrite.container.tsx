import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import BoardWriteUI from "./boardWrite.presenter"
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries"
import { IBoardWriteProps, IMyUpdateBoardInput } from "./boardWrite.types"
import { Modal } from "antd"

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter()

  const [writer, setWriter] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [contents, setContents] = useState<string>("")
  const [isActive, setIsActive] = useState<boolean>(false)

  const [createBoard] = useMutation(CREATE_BOARD)
  const [updateBoard] = useMutation(UPDATE_BOARD)

  function onChangeWriter(event: ChangeEvent<HTMLInputElement>) {
    setWriter(event.target.value)
    event.target.value && password && title && contents
      ? setIsActive(true)
      : setIsActive(false)
  }

  function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
    writer && event.target.value && title && contents
      ? setIsActive(true)
      : setIsActive(false)
  }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
    writer && password && event.target.value && contents
      ? setIsActive(true)
      : setIsActive(false)
  }

  function onChangeContents(event: ChangeEvent<HTMLTextAreaElement>) {
    setContents(event.target.value)
    writer && password && title && event.target.value
      ? setIsActive(true)
      : setIsActive(false)
  }

  async function onClickSubmit() {
    if (writer && password && title && contents) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password,
              title,
              contents,
            },
          },
        })
        router.push(`/boards/${result.data.createBoard._id}`)
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  async function onClickUpdate() {
    if (!title && !contents && !props.isEdit) {
      Modal.error({ content: "하나는 입력해야합니다." })
      return
    }

    if (!password) {
      Modal.error({ content: "비밀번호를 입력해주세요." })
      return
    }

    const myUpdateBoardInput: IMyUpdateBoardInput = {}
    if (title) myUpdateBoardInput.title = title
    if (contents) myUpdateBoardInput.contents = contents

    try {
      await updateBoard({
        variables: {
          boardId: router.query.id,
          password: password,
          updateBoardInput: myUpdateBoardInput,
        },
      })
      Modal.success({ content: "수정이 완료되었습니다." })
      router.push(`/boards/${router.query.id}`)
    } catch (error) {
      Modal.error({ content: error.message })
    }
  }

  function onClickMovetoHome() {
    router.push(`/`)
  }

  return (
    <BoardWriteUI
      isActive={isActive}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onClickMovetoHome={onClickMovetoHome}
      isEdit={props.isEdit}
      data={props.data}
    />
  )
}
