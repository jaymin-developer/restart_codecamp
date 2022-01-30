import styled from "@emotion/styled";

export const MyInput = styled.input``;

export const MyButton = styled.button`
  background-color: ${(props) => (props.isActive === true ? "yellow" : "none")};
`;
