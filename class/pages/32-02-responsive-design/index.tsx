import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 1000px;
  height: 1000px;
  background-color: red;

  @media (min-width: 768px) and (max-width: 991px) {
    width: 500px;
    height: 500px;
    background-color: green;
  }

  @media (max-width: 767px) {
    width: 100px;
    height: 100px;
    background-color: blue;
  }
`;

// 태블릿 기준이 바뀐다면?? 991px-> 1000px로 바꾼다면? 처음 만들 때부터 따로 빼놓는다.

export default function ResponsiveDesignPage() {
  return <Wrapper>상자</Wrapper>;
}
