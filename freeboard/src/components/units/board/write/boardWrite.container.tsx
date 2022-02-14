import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import BoardWriteUI from "./boardWrite.presenter"
import { CREATE_BOARD, UPDATE_BOARD, UPLOAD_FILE } from "./BoardWrite.queries"
import { IBoardWriteProps, IMyUpdateBoardInput } from "./boardWrite.types"
import { Modal } from "antd"

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter()

  const [writer, setWriter] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [images, setImages] = useState([""])
  const [contents, setContents] = useState<string>("")
  const [youtubeUrl, setYoutubeUrl] = useState<String>("")
  const [isActive, setIsActive] = useState<boolean>(false)

  const [createBoard] = useMutation(CREATE_BOARD)
  const [updateBoard] = useMutation(UPDATE_BOARD)
  const [uploadFile] = useMutation(UPLOAD_FILE)

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

  function onChangeYoutubeUrl(event: ChangeEvent<HTMLTextInputElement>) {
    setYoutubeUrl(event.target.value)
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
              youtubeUrl,
              images,
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

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    // result에는 url
    try {
      const result = await uploadFile({
        variables: {
          file,
        },
      })
      console.log(result.data?.uploadFile.url)

      setImages(result.data?.uploadFile.url || "")
    } catch (error) {
      if (error instanceof Error) alert(error.message)
    }
  }

  function onClickMovetoBoard() {
    router.push(`/boards`)
  }

  return (
    <BoardWriteUI
      isActive={isActive}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onChangeYoutubeUrl={onChangeYoutubeUrl}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onClickMovetoBoard={onClickMovetoBoard}
      onChangeFile={onChangeFile}
      images={images}
      isEdit={props.isEdit}
      data={props.data}
    />
  )
}
