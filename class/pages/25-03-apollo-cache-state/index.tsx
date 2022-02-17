import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function ApolloCacheStatePage() {
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD);

  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardArgs>(
    FETCH_BOARDS
  );

  //   가장 가까운 애에다가 async
  const onClickDelete = (boardId: string) => async () => {
    // 삭제하기 로직
    await deleteBoard({
      // variables: {boardId: boardId}
      variables: { boardId },
      // refetchQueries: []
      update(cache, { data }) {
        const deletedId = data.deleteBoard;
        // data.deleteBoard랑 boardId 중에 활용하면 된다.
        // cache는 기존 데이터, {data}는 딜리트 하고 받는 데이터
        cache.modify({
          fields: {
            fetchBoards: (prev, { readField }) => {
              // prev 안에 기존 30개 데이터가 존재 => 29개로 만들어줘야돼
              // prev에서 기능 제공
              // 함수를 읽을 수 있게, el._id 읽을 수가 없다.
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId // el._id가 안되므로 readField를 사용
              );
              return [...filteredPrev];
            },
          },
        });
      },
    });
  };

  const onClickSubmit = async () => {
    //   등록하기 로직
    await createBoard({
      variables: {
        createBoardInput: {
          writer: "영희",
          password: "1234",
          title: "제목",
          contents: "내용",
        },
      },
      // refetchQueries: []
      update(cache, { data }) {
        // setState 느낌
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data.createBoard, ...prev]; // [{writer:"영희", password:"1234"},],{기존 30개}
            },
          },
          // 필드는 패치프로덕트 등
        });
      },
    });
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>{el.writer}</span>
          <span>{el.title}</span>
          <span>{el.contents}</span>
          <button onClick={onClickDelete(el._id)}>삭제하기</button>
        </div>
      ))}
      <button onClick={onClickSubmit}>등록하기</button>
      {/* 등록하기는 특정 아이디 없음 */}
    </div>
  );
}
