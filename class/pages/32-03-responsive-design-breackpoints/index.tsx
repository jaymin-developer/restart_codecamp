import styled from "@emotion/styled"
import { breakPoints } from "../../src/commons/styles/media"

const Wrapper = styled.div`
  width: 1000px;
  height: 1000px;
  background-color: red;

  @media ${breakPoints.tablet} {
    width: 500px;
    height: 500px;
    background-color: green;
  }

  @media ${breakPoints.mobile} {
    width: 6.25rem;
    height: 100px;
    background-color: blue;
  }
`

// 태블릿 기준이 바뀐다면?? 991px-> 1000px로 바꾼다면? 처음 만들 때부터 따로 빼놓는다. styled
// 모바일 앱과 웹은 다르다. 앱은 다운로드, 웹은 미디어쿼리 써서 활용
// 기본 중심 360 * 740
// 가급적 가로는 %
// 작은 거 기준으로 만들어서 키우기, 너무 작은 것에 만드는 건 디자이너랑 이야기해서 브레이크포인트 하나 더 만들지 협의 필요

// em, rem 한 번에 바꿀 수 있음. em을 많이 쓰진 않음.
// 픽셀을 rem으로 적용 px to rem converter

export default function ResponsiveDesignPage() {
  return <Wrapper>상자</Wrapper>
}
