//backend05

import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    # 데이터 입력해야할 부분 variables에 있는 값을 위에서 확인하고 아래로 전달
    createBoard(createBoardInput: $createBoardInput) {
      # 데이터 보여줄 부분
      _id
      writer
      title
      contents
    }

    # $부분을 다른 곳에도 보내줄 수 있다. 묶음 요청
    #  createProduct()
  }
`;

export default function GraphqlMutationArgs() {
  const [aaa, setAaa] = useState("");
  const [qqq] = useMutation(CREATE_BOARD);

  const zzz = async () => {
    const result = await qqq({
      variables: {
        createBoardInput: {
          writer: "연습",
          password: "123",
          title: "제목",
          contents: "연습",
        },
        // 객체는 키와 밸류 구조인 것을 잊지 말자
        // variables 데이터를 입력하는 란, creatBoardInput과 같음
      },
    });
    setAaa(result.data.createBoard.title);
  };

  return (
    <>
      <button onClick={zzz}>GRAPHQL-API 요청하기</button>
      <div>{aaa}</div>
    </>
  );
}
