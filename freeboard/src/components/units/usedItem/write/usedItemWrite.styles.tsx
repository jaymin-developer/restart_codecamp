import styled from "@emotion/styled"

export const Wrapper = styled.form`
  max-width: 1000px;
  box-sizing: border-box;
  margin: 30px auto 30px auto;
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
  color: darkred;
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
  color: ${(props) => (props.isEdit || props.isActive ? "red" : "#d4d4d4")};
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
  justify-content: space-between;
`

export const ItemName = styled.div`
  font-size: 18px;
  width: 50%;
`

export const Input = styled.input`
  font-size: 18px;
  height: 20px;
  margin-left: 10px;
  padding-left: 5px;
  border: none;
  border-left: 1px solid;
`

export const ItemPrice = styled.div`
  font-size: 18px;
  width: 50%;
`

export const WrapperBodyBody = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const Review = styled.input`
  font-size: 18px;
  width: 100%;
  padding: 10px;
  /* border: none; */
  border: 1px solid #d4d4d4;
`

export const Contents = styled.textarea`
  margin-top: 20px;
  font-size: 18px;
  width: 100%;
  height: 300px;
  resize: none;
  padding: 10px;
  border: 1px solid #d4d4d4;
  /* border: none; */
`

export const Location = styled.div`
  width: 100%;
  padding: 20px 30px;
  border-top: 1px solid #d4d4d4;
`

export const WrapperFoot = styled.div`
  width: 100%;
`

export const ImageUpload = styled.div`
  width: 100%;
  padding: 20px 30px;
  border-top: 1px solid #d4d4d4;
`

export const MainImage = styled.div`
  width: 100%;
  padding: 20px 30px;
  border-top: 1px solid #d4d4d4;
`
