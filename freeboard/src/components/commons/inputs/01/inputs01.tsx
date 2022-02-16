import styled from "@emotion/styled"

export const Input = styled.input`
  font-size: 18px;
  height: 20px;
  margin-left: 10px;
  padding-left: 5px;
  border: none;
  border-left: 1px solid;
`

export default function Input01(props) {
  return (
    <Input
      placeholder={props.placeholder}
      type={props.type}
      {...props.register}
    />
  )
}
