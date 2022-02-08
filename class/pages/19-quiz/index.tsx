import { useMutation, gql } from "@apollo/client"
import { useRouter } from "next/router"
import { ChangeEvent, useRef, useState } from "react"
import { LikeOutlined } from "@ant-design/icons"
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types"

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`

export default function ImageUploadPage() {
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [contents, setContents] = useState("")

  const [createBoard] = useMutation(CREATE_BOARD)
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE)
  const [images, setImages] = useState("")

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log(file)

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

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value)
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value)
  }

  async function onClickSubmit() {
    if (writer && password && title && contents) {
      try {
        await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password,
              title,
              contents,
              images,
            },
          },
        })
        alert("저장 완료")
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  const onClickIcon = () => {
    fileRef.current?.click()
  }

  return (
    <div>
      <div>
        작성자
        <input type="text" onChange={onChangeWriter} />
      </div>
      <div>
        비밀번호
        <input type="password" onChange={onChangePassword} />
      </div>
      <div>
        제목
        <input type="text" onChange={onChangeTitle} />
      </div>
      <div>
        내용
        <input type="text" onChange={onChangeContents} />
      </div>
      <div>
        <LikeOutlined onClick={onClickIcon} />
        <input
          style={{ display: "none" }}
          type="file"
          ref={fileRef}
          onChange={onChangeFile}
        />
        {images ? <img src={`https://storage.googleapis.com/${images}`} /> : ""}
      </div>
      <button onClick={onClickSubmit}>저장하기</button>
    </div>
  )
}
