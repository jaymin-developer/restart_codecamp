import styled from "@emotion/styled"

const Wrapper = styled.div`
  margin: 30px 0px 0px 30px;
  padding: 20px;
  width: 300px;
  height: 300px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;

  & h3 {
    text-align: center;
  }
`

export default function LayoutNavigation() {
  return (
    <Wrapper>
      <h3>실시간 인기 검색어</h3>
      <div>1. 코드캠프</div>
      <div>2. 프론트엔드</div>
      <div>3. 개발자</div>
      <div>4. 노원두 멘토님</div>
      <div>5. 오늘의 PF</div>
      <div>6. 모각코</div>
      <div>7. 리액트</div>
      <div>8. 타입스크립트</div>
      <div>9. husky</div>
      <div>10. 취업</div>
    </Wrapper>
  )
}
