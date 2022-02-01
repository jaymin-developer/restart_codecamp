import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import BoardWriteUI from "./boardWrite.presenter"
import { CREATE_BOARD } from "./boardWrite.queries"
import { IBoardWriteProps } from "./boardWrite.types"

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter()

  const [writer, setWriter] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [contents, setContents] = useState<string>("")
  const [isActive, setIsActive] = useState<boolean>(false)

  const [createBoard] = useMutation(CREATE_BOARD)

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

  console.log(isActive)

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
      onClickMovetoHome={onClickMovetoHome}
      isEdit={false}
      data={undefined}
    />
  )
}
