import styled from "@emotion/styled"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`

export const Head = styled.h1`
  text-align: center;
`
export const BestBoards = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const BodyInfo = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
`

export const SearchTitle = styled.input`
  width: 50%;
  height: 60px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 10px;
  padding-left: 20px;
`

export const SearchDate = styled.button`
  width: 20%;
  height: 60px;
  background-color: white;
  border: 1px solid #bdbdbd;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`
export const WriteButton = styled.button`
  width: 10%;
  height: 60px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  background-color: red;
  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
`

export const SearchButton = styled.button`
  width: 10%;
  height: 60px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  background-color: black;
  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
`
export const ContentsList = styled.div`
  width: 100%;
`

export const UpdateIcon = styled(AutoAwesomeIcon)`
  color: red;
`

export const PageNationDetail = styled.span`
  font-size: large;
  color: ${(props) =>
    props.clickPage === props.index + props.startPage ? "darkred" : ""};
  cursor: pointer;
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
`

export const PageNationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
