import styled from "@emotion/styled"

export const TableTop = styled.div`
  border-top: 2px solid gray;
  margin-top: 20px;
`

export const TableBottom = styled.div`
  border-bottom: 2px solid gray;
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;

  :hover {
    color: blue;
  }
`

export const ColumnHeaderBasic = styled.div`
  width: 20%;
  text-align: center;
`

export const ColumnHeaderTitle = styled.div`
  width: 40%;
  text-align: center;
`

export const ColumnBasic = styled.div`
  width: 20%;
  text-align: center;
`

export const ColumnTitle = styled.div`
  width: 40%;
  text-align: center;
  cursor: pointer;

  :hover {
    color: blue;
  }
`

// export const TextToken = styled.span`
//   color: ${(props) => (props.isMatched ? "red" : "black")};
// `
