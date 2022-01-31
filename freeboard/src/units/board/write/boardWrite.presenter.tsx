import * as S from "./boardWrite.styles"
import { IBoardWriteUIProps } from "./boardWrite.types"

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  return (
    <S.Wrapper>
      <S.WrapperHead>
        <S.CancelButton onClick={props.onClickMovetoHome}>취소</S.CancelButton>
        <S.WrapperTitle>글쓰기</S.WrapperTitle>
        <S.SubmitButton isActive={props.isActive} onClick={props.onClickSubmit}>
          {props.isEdit ? "수정" : "등록"}
        </S.SubmitButton>
      </S.WrapperHead>
      <S.WrapperBody>
        <S.WrapperBodyHead>
          <S.Writer>
            작성자
            <S.Input
              type="text"
              placeholder="작성자를 입력해주세요"
              onChange={props.onChangeWriter}
            ></S.Input>
          </S.Writer>
          <S.Password>
            비밀번호
            <S.Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={props.onChangePassword}
            ></S.Input>
          </S.Password>
        </S.WrapperBodyHead>
        <S.WrapperBodyBody>
          <S.Title
            type="text"
            placeholder="제목을 입력해주세요"
            onChange={props.onChangeTitle}
          />
          <S.Contents
            placeholder="내용을 입력해주세요"
            onChange={props.onChangeContents}
          />
        </S.WrapperBodyBody>
      </S.WrapperBody>
      <S.WrapperFoot>사진, 주소, youtube</S.WrapperFoot>
    </S.Wrapper>
  )
}
