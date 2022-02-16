import { useState } from "react"
import UploadButtons from "../../../commons/imageUpload"
import * as S from "./usedItemWrite.styles"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Input01 from "../../../commons/inputs/01/inputs01"

const schema = yup.object().shape({
  UsedItem: yup.string().required("도서명은 필수 입력 사항입니다."),
  ItemPrice: yup.string().required("판매 가격은 필수 입력 사항입니다."),
})

interface FormValues {
  UsedItem?: string
  ItemPrice?: string
}

export default function UsedItemWriteUI(props) {
  const [images, setImages] = useState([""])
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    // 리액트 훅 폼과 연결한다.
  })

  const onClickSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <S.Wrapper onSubmit={handleSubmit(onClickSubmit)}>
      <S.WrapperHead>
        <S.CancelButton onClick={props.onClickMovetoBoard}>취소</S.CancelButton>
        <S.WrapperTitle>
          {props.isEdit ? "상품 수정" : "상품 등록"}
        </S.WrapperTitle>
        <S.SubmitButton
          isEdit={props.isEdit}
          isActive={props.isActive}
          onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
        >
          {props.isEdit ? "수정" : "등록"}
        </S.SubmitButton>
      </S.WrapperHead>
      <S.WrapperBody>
        <S.WrapperBodyHead>
          <S.ItemName>
            도서명
            <Input01
              type="text"
              placeholder="도서명을 입력해주세요"
              register={register("UsedItem")}
              //   onChange={props.onChangeWriter}
              //   defaultValue={props.data?.fetchBoard.writer}
              //   readOnly={!!props.data?.fetchBoard.writer}
            ></Input01>
            <div style={{ color: "red" }}>
              {formState.errors.UsedItem?.message}
            </div>
          </S.ItemName>
          <S.ItemPrice>
            판매 가격
            <Input01
              type="number"
              placeholder="판매 가격을 입력해주세요."
              onChange={props.onChangePassword}
              register={register("ItemPrice")}
            ></Input01>
            <div style={{ color: "red" }}>
              {formState.errors.ItemPrice?.message}
            </div>
          </S.ItemPrice>
        </S.WrapperBodyHead>
        <S.WrapperBodyBody>
          <S.Review
            type="text"
            placeholder="한 줄 도서평을 입력해주세요"
            onChange={props.onChangeTitle}
            defaultValue={props.data?.fetchBoard.title}
          />
          <S.Contents
            placeholder="도서를 설명해주세요"
            onChange={props.onChangeContents}
            defaultValue={props.data?.fetchBoard.contents}
          />
          <S.Review
            type="text"
            placeholder="태그를 입력해주세요(예시 : #태그)"
            onChange={props.onChangeTitle}
            defaultValue={props.data?.fetchBoard.title}
          />
        </S.WrapperBodyBody>
      </S.WrapperBody>
      <S.WrapperFoot>
        <S.Location>
          거래위치
          <br />
          GPS <br />
          주소 <br />
          <input />
          <input />
        </S.Location>
        <S.ImageUpload>
          <UploadButtons onChangeFile={props.onChangeFile} images={images} />
        </S.ImageUpload>
        <S.MainImage>
          메인 사진 설정
          <br />
          <br />
          <input type="radio" name="main" />
          사진 1 <span> </span>
          <input type="radio" name="main" />
          사진 2
        </S.MainImage>
      </S.WrapperFoot>
    </S.Wrapper>
  )
}
