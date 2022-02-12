import { useContext } from "react"
import { ExampleContext } from "../../../../pages/21-example/context/board/edit"

export default function BoardWriteUI() {
  const { isEdit } = useContext(ExampleContext)
  return <h1>{isEdit ? "수정하기" : "등록하기"}</h1>
}
