import * as S from "./SignUp.styles"

export default function SignUpPageUI(props) {
  return (
    <>
      <S.Wrapper>
        <S.Title>📚 북스메모리 회원가입</S.Title>
        <S.Email
          type="text"
          placeholder="이메일을 입력해주세요."
          onChange={props.onChangeEmail}
          value={props.email}
        ></S.Email>
        <S.Name
          type="text"
          placeholder="이름을 입력해주세요."
          onChange={props.onChangeName}
          value={props.name}
        ></S.Name>
        <S.Password
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={props.onChangePassword}
          value={props.password}
        ></S.Password>
        <S.CheckPassword
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          onChange={props.onChangeCheckPassword}
          value={props.checkPassword}
        ></S.CheckPassword>
        <S.PhoneNumber></S.PhoneNumber>
        <S.SignUpButton onClick={props.onClickSignUp}>가입하기</S.SignUpButton>
      </S.Wrapper>
    </>
  )
}
