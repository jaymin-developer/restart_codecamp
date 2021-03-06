import { gql, useMutation, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { IQuery } from "../../../../commons/types/generated/types"

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  padding: 10px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LogoDiv = styled.div`
  width: 70%;
`

const Logo = styled.h1`
  width: 30%;
  display: inline;
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

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
    }
  }
`
const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`

export default function LayoutHeader() {
  const router = useRouter()
  const [logoutUser] = useMutation(LOGOUT_USER)

  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN)

  function onClickLogin() {
    router.push("/login")
  }

  function onClickSignup() {
    router.push("/signup")
  }

  function onClickGoHome() {
    router.push("/boards")
  }

  function onClickLogOut() {
    logoutUser()
    alert("로그아웃이 됐습니다.")
    window.location.reload()
  }

  function onClickGoMyPage() {
    router.push("/mypage")
  }

  return (
    <Wrapper>
      <LogoDiv>
        <Logo onClick={onClickGoHome}>📚 Book&apos;s Memory</Logo>
      </LogoDiv>
      {data?.fetchUserLoggedIn ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "10px", fontSize: "16px" }}>
            {data?.fetchUserLoggedIn.name}님 안녕하세요😆
          </div>

          <LoginButton onClick={onClickGoMyPage}>마이페이지</LoginButton>
        </div>
      ) : (
        <LoginButton onClick={onClickLogin}>로그인</LoginButton>
      )}
      {data?.fetchUserLoggedIn ? (
        <SignupButton onClick={onClickLogOut}>로그아웃</SignupButton>
      ) : (
        <SignupButton onClick={onClickSignup}>회원가입</SignupButton>
      )}
    </Wrapper>
  )
}
