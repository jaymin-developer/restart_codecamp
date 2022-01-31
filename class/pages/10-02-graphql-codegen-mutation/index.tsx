//backend05

import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../src/commons/types/generated/types";

const CREATE_BOARD = gql`
  mutation {
    createBoard(
      createBoardInput: {
        writer: "연습"
        password: "123"
        title: "제목"
        contents: "연습"
      }
    ) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutation() {
  const [aaa, setAaa] = useState<string>("");
  const [qqq] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const zzz = async () => {
    const result = await qqq();
    setAaa(result.data.createBoard.writer);
  };

  return (
    <>
      <button onClick={zzz}>GRAPHQL-API 요청하기</button>
      <div>{aaa}</div>
    </>
  );
}
