import { Fragment } from "react";
import * as S from "./login.styles";

export default function LoginPageUI(props) {
  return (
    <Fragment>
      <S.Wrapper>
        <S.LoginHeader>
          <S.Logo>📚</S.Logo>
          <S.Moto>책이 당신을 기억합니다.</S.Moto>
        </S.LoginHeader>
        <S.LoginBody>
          <S.Email
            type="text"
            placeholder="아이디"
            onChange={props.onChangeEmail}
            value={props.email}
          ></S.Email>
          <S.Password
            type="password"
            placeholder="패스워드"
            onChange={props.onChangePassword}
            value={props.password}
          ></S.Password>
          <S.LoginButton onClick={props.onClickLogin}>로그인</S.LoginButton>
        </S.LoginBody>
        <S.LoginFooter>
          <S.FindEmail>아이디 찾기</S.FindEmail>
          <S.FindPassword>비밀번호 찾기</S.FindPassword>
          <S.Signup onClick={props.onClickSignup}>회원가입</S.Signup>
        </S.LoginFooter>
        <S.SocialLoginButton>
          <S.SocialLoginButtonImg src="/images/kakao.png"></S.SocialLoginButtonImg>
          <S.SocialLoginButtonTitle>
            카카오톡으로 로그인
          </S.SocialLoginButtonTitle>
        </S.SocialLoginButton>
      </S.Wrapper>
    </Fragment>
  );
}
