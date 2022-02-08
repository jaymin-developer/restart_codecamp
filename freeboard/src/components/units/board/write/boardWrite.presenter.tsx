import * as S from "./BoardWrite.styles"
import { IBoardWriteUIProps } from "./boardWrite.types"
import UploadButtons from "../../../commons/imageUpload/index"

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  return (
    <S.Wrapper>
      <S.WrapperHead>
        <S.CancelButton onClick={props.onClickMovetoBoard}>취소</S.CancelButton>
        <S.WrapperTitle>{props.isEdit ? "글수정" : "글쓰기"}</S.WrapperTitle>
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
          <S.Writer>
            작성자
            <S.Input
              type="text"
              placeholder="작성자를 입력해주세요"
              onChange={props.onChangeWriter}
              defaultValue={props.data?.fetchBoard.writer}
              readOnly={!!props.data?.fetchBoard.writer}
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
            defaultValue={props.data?.fetchBoard.title}
          />
          <S.Contents
            placeholder="내용을 입력해주세요"
            onChange={props.onChangeContents}
            defaultValue={props.data?.fetchBoard.contents}
          />
        </S.WrapperBodyBody>
      </S.WrapperBody>
      <S.WrapperFoot>
        <S.ImageUpload>
          <UploadButtons
            onChangeFile={props.onChangeFile}
            images={props.images}
          />
        </S.ImageUpload>
      </S.WrapperFoot>
    </S.Wrapper>
  )
}
