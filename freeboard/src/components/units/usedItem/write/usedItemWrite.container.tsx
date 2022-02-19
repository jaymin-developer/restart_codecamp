import UsedItemWriteUI from "./usedItemWrite.presenter"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router"
import { CREATE_USED_ITEM, UPLOAD_FILE } from "./usedItemWrite.queries"
import { useMutation } from "@apollo/client"

const schema = yup.object().shape({
  name: yup
    .string()
    .max(20, "최대 20자까지 작성 가능합니다.")
    .required("도서명은 필수 입력 사항입니다."),
  price: yup.string().required("판매 가격은 필수 입력 사항입니다."),
  remarks: yup
    .string()
    .min(10, "10자 이상 작성해주세요.")
    .max(100, "100자 까지 작성가능합니다.")
    .required("한줄평은 필수 입력 사항입니다."),
  contents: yup
    .string()
    .min(10, "설명란에 10자 이상 작성해주세요.")
    .required("설명란은 필수 입력 사항입니다."),
})

interface FormValues {
  name?: string
  remarks?: string
  contents?: string
  price?: number
}

export default function UsedItemWrite(props) {
  const router = useRouter()
  const [uploadFile] = useMutation(UPLOAD_FILE)
  const [createUseditem] = useMutation(CREATE_USED_ITEM)
  const [images, setImages] = useState([])
  const [tags, setTags] = useState<string[]>([])
  const [tag, setTag] = useState("")
  // const fileRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    // 리액트 훅 폼과 연결한다.
  })

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    try {
      const result = await uploadFile({
        variables: { file },
      })
      const imageUrl = result.data?.uploadFile.url
      setImages((prev) => [...prev, imageUrl])
    } catch (error) {
      if (error instanceof Error) alert(error.message)
    }
  }

  // const onClickUploadFile = () => {
  //   fileRef.current?.click();
  // };
  const onChangeTag = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value)
  }

  const onKeyUpTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setTags((prev) => [...prev, tag])
      setTag("")
    }
  }

  const onClickDeleteTag = (tagname: string) => () => {
    setTags((prev) => prev.filter((el) => el !== tagname))
  }

  const onClickSubmit = async (data: FormValues) => {
    const writeVariables = {
      createUseditemInput: {
        name: data.name,
        remarks: data.remarks,
        contents: data.contents,
        price: Number(data.price),
        images: images,
        // tags: tags,
      },
    }

    try {
      const result = await createUseditem({
        variables: writeVariables,
      })
      alert("제품 등록 성공!")
      router.push(`/usedItems/${result.data.createUseditem._id}`)
    } catch (error) {
      if (error instanceof Error) alert(error.message)
    }
  }

  function onClickMovetoUseditem() {
    router.push(`/useditems/`)
  }

  // async function onClickUpdate() {
  //   await update
  // }

  return (
    <UsedItemWriteUI
      isEdit={props.isEdit}
      data={props.data}
      images={images}
      tag={tag}
      tags={tags}
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      onClickSubmit={onClickSubmit}
      onChangeFile={onChangeFile}
      onClickMovetoUseditem={onClickMovetoUseditem}
      onChangeTag={onChangeTag}
      onKeyUpTags={onKeyUpTags}
      onClickDeleteTag={onClickDeleteTag}
    />
  )
}
