import styled from "@emotion/styled"
import { useRouter } from "next/router"

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  padding: 10px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LogoDiv = styled.div`
  width: 85%;
`

const Logo = styled.h1`
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`

const LoginButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: darkred;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`

const SignupButton = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`

export default function LayoutHeader() {
  const router = useRouter()

  function OnClickLogin() {
    router.push("/login")
  }

  function onClickSignup() {
    router.push("/signup")
  }

  function onClickGoHome() {
    router.push("/boards")
  }

  return (
    <Wrapper>
      <LogoDiv>
        <Logo onClick={onClickGoHome}>📚 Book's Memory</Logo>
      </LogoDiv>
      <LoginButton onClick={OnClickLogin}>로그인</LoginButton>
      <SignupButton onClick={onClickSignup}>회원가입</SignupButton>
    </Wrapper>
  )
}
