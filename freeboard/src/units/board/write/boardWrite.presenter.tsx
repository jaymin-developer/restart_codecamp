import * as S from "./boardWrite.styles"

export default function BoardWriteUI() {
  return (
    <S.Wrapper>
      <S.WrapperHead>
        <S.CancelButton>취소</S.CancelButton>
        <S.WrapperTitle>글쓰기</S.WrapperTitle>
        <S.SubmitButton>등록</S.SubmitButton>
      </S.WrapperHead>
      <S.WrapperBody>
        <S.WrapperBodyHead>
          <S.Writer>
            작성자
            <input type="text" placeholder="작성자를 입력해주세요"></input>
          </S.Writer>
          <S.Password>
            비밀번호
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
            ></input>
          </S.Password>
        </S.WrapperBodyHead>
        <S.WrapperBodyBody>
          <S.Title type="text" placeholder="제목을 입력해주세요" />
          <S.Contents placeholder="내용을 입력해주세요" />
        </S.WrapperBodyBody>
      </S.WrapperBody>
      <S.WrapperFoot>사진, 주소, youtube</S.WrapperFoot>
    </S.Wrapper>
  )
}
