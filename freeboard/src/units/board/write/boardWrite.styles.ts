import styled from "@emotion/styled"

export const Wrapper = styled.div`
  max-width: 750px;
  box-sizing: border-box;
  margin: 30px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #d4d4d4;
`

export const WrapperHead = styled.div`
  padding: 0 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d4d4d4;
  height: 66px;
  line-height: 66px;
`

export const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  :hover {
    cursor: pointer;
  }
`

export const WrapperTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`

export const SubmitButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #d4d4d4;
  :hover {
    cursor: pointer;
  }
`

export const WrapperBody = styled.div`
  padding: 40px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const WrapperBodyHead = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const Writer = styled.div`
  font-size: 18px;
  width: 50%;
  & input {
    font-size: 18px;
    height: 20px;
    margin-left: 10px;
    padding-left: 5px;
    border: none;
    border-left: 1px solid;
  }
`

export const Password = styled.div`
  font-size: 18px;
  width: 50%;
  & input {
    font-size: 18px;
    height: 20px;
    margin-left: 10px;
    padding-left: 5px;
    border: none;
    border-left: 1px solid;
  }
`

export const WrapperBodyBody = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const Title = styled.input`
  font-size: 18px;
  width: 100%;
  height: 60px;
  border: none;
  border-bottom: 1px solid #d4d4d4;
`

export const Contents = styled.textarea`
  margin-top: 20px;
  font-size: 18px;
  width: 100%;
  height: 300px;
  resize: none;
  border: none;
`

export const WrapperFoot = styled.div`
  width: 100%;
  height: 36px;
  background-color: lightgray;
`
