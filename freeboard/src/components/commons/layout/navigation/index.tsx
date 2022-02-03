import styled from "@emotion/styled"

const Wrapper = styled.div`
  height: 50px;
  background-color: darkred;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
`

const Menu = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  & button {
    border: none;
    background-color: darkred;
    :hover {
      cursor: pointer;
    }
  }
`

export default function LayoutNavigation() {
  return (
    <Wrapper>
      <Menu>
        <button>도서정보 검색</button>
        <button>자유게시판</button>
        <button>중고마켓</button>
        <button>나의 기록</button>
      </Menu>
    </Wrapper>
  )
}
