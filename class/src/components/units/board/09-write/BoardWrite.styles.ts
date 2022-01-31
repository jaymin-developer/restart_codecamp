import styled from "@emotion/styled";

export const MyInput = styled.input``;

interface IProps {
  isActive: boolean;
}

export const MyButton = styled.button`
  background-color: ${(props: IProps) =>
    props.isActive === true ? "yellow" : "none"};
`;
