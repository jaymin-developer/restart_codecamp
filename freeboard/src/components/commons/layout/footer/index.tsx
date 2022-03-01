import styled from "@emotion/styled"
import { breakPoints } from "../../../../commons/styles/media"

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
  line-height: 50px;
  background-color: darkred;
  color: white;
  @media ${breakPoints.tablet} {
    font-size: 14px;
  }
  @media ${breakPoints.mobile} {
    font-size: 11px;
  }
`

export default function LayoutFooter() {
  return (
    <Wrapper>
      <div>이용약관</div>
      <div>개인정보처리방침</div>
      <div>공지사항</div>
      <div>문의하기</div>
      <div>©Book&apos;s Memory</div>
    </Wrapper>
  )
}
