import styled from "@emotion/styled"
import { useRouter } from "next/router"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const LogoDiv = styled.div`
  width: 100%;
  height: 100px;
  padding: 30px 80px;
`

const Logo = styled.h1`
  width: 30%;
  display: inline;
  color: white;
`
const Page1 = styled.div`
  width: 100%;
  height: 720px;
  padding-top: 40;
  display: flex;
  flex-direction: column;
  background-size: cover;
  overflow: hidden;
  background-image: url("/images/letter-box.jpg");
`
const Moto = styled.div`
  width: 600px;
  margin: 100px;
  color: white;
  font-size: 48px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  /* align-items: center; */
  & p {
    font-size: 60px;
  }
`

const HomeButton = styled.button`
  width: 300px;
  background-color: rgba(25, 25, 25, 0);
  border-radius: 20px;
  border: 3px solid white;
  font-size: 24px;
  padding: 16px;
  :hover {
    cursor: pointer;
  }
`

const Page2 = styled.div`
  width: 100%;
  height: 720px;
  padding-top: 40;
  display: flex;
  flex-direction: column;
  background-size: cover;
  overflow: hidden;
  background-image: url("/images/book.jpg");
`

const Message = styled.div`
  width: 30%;
  height: 500px;
  background-color: #9b794ce1;
  margin: 100px;
  border: 1px solid lightgray;
  padding: 50px;
`

export default function LandingPage() {
  const router = useRouter()

  function onClickGoHome() {
    router.push("/boards")
  }

  return (
    <Wrapper>
      <Page1>
        <LogoDiv>
          <Logo>📚 Book's Memory</Logo>
        </LogoDiv>
        <Moto>
          책이 당신을 기억합니다.
          <br />
          <p>독서 기록 프로젝트</p>
          <HomeButton onClick={onClickGoHome}>홈페이지 바로가기</HomeButton>
        </Moto>
      </Page1>
      <Page2>
        {/* <Message>
          독서를 하면서 느낀 감정과 생각 그리고 가슴 속 새기고 싶은 문구들.
          기록은 했지만 나중에 찾으려니 한 세월, 그 기록을 여러분께 전달하려고
          합니다.​ '느린 우체통' 들어보셨나요? 편지를 넣으면 1년 뒤에 수거하여
          보내주는 우체통인데요. 잊을 때 쯤 돌아오는 편지를 보며 '느린 우책통'
          프로젝트를 기획하게 됐습니다. ​ ​여러분의 책을 기록해주세요. 당신의
          책이 여러분을 기억하여 찾아갑니다.{" "}
        </Message> */}
      </Page2>
    </Wrapper>
  )
}
