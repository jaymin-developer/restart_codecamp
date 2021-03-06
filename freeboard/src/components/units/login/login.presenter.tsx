import {
  ChangeEventHandler,
  ReactChild,
  ReactFragment,
  ReactPortal,
  MouseEventHandler,
} from "react"
import * as S from "./login.styles"

export default function LoginPageUI(props: {
  onChangeEmail: ChangeEventHandler<HTMLInputElement>
  email: string | number | readonly string[]
  emailError: boolean | ReactChild | ReactFragment | ReactPortal
  onChangePassword: ChangeEventHandler<HTMLInputElement>
  password: string | number | readonly string[]
  passwordError: boolean | ReactChild | ReactFragment | ReactPortal
  onClickLogin: MouseEventHandler<HTMLButtonElement>
  onClickSignUp: MouseEventHandler<HTMLDivElement>
}) {
  return (
    <>
      <S.Wrapper>
        <S.LoginHeader>
          <S.Logo>๐</S.Logo>
          <S.Moto>์ฑ์ด ๋น์ ์ ๊ธฐ์ตํฉ๋๋ค.</S.Moto>
        </S.LoginHeader>
        <S.LoginBody onKeyPress={props.onCheckEnter}>
          <S.Email
            type="email"
            placeholder="์์ด๋"
            onChange={props.onChangeEmail}
            value={props.email}
            required
          ></S.Email>
          <S.ErrorMessage>{props.emailError}</S.ErrorMessage>
          <S.Password
            type="password"
            placeholder="ํจ์ค์๋"
            onChange={props.onChangePassword}
            value={props.password}
            required
          ></S.Password>
          <S.ErrorMessage>{props.passwordError}</S.ErrorMessage>
          <S.LoginButton onClick={props.onClickLogin}>๋ก๊ทธ์ธ</S.LoginButton>
        </S.LoginBody>
        <S.LoginFooter>
          <S.FindEmail>์์ด๋ ์ฐพ๊ธฐ</S.FindEmail>
          <S.FindPassword>๋น๋ฐ๋ฒํธ ์ฐพ๊ธฐ</S.FindPassword>
          <S.SignUp onClick={props.onClickSignUp}>ํ์๊ฐ์</S.SignUp>
        </S.LoginFooter>
        <S.SocialLoginButton>
          <S.SocialLoginButtonImg src="/images/kakao.png"></S.SocialLoginButtonImg>
          <S.SocialLoginButtonTitle>
            ์นด์นด์คํก์ผ๋ก ๋ก๊ทธ์ธ
          </S.SocialLoginButtonTitle>
        </S.SocialLoginButton>
      </S.Wrapper>
    </>
  )
}
