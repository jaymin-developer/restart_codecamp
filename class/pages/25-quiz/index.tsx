// 댓글 무한 스크롤에서 하는 방식

import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
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

interface FormValues {
  writer?: string;
  password?: string;
  title?: string;
  contents?: string;
}

export default function ApolloCacheStatePage() {
  const { register, handleSubmit } = useForm();
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
                (el: any) => readField("_id", el) !== deletedId // el._id가 안되므로 readField를 사용
              );
              return [...filteredPrev];
            },
          },
        });
      },
    });
  };

  const onClickSubmit = async (data: FormValues) => {
    //   등록하기 로직
    await createBoard({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: data.title,
          contents: data.contents,
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
          <span>작성자 : {el.writer} </span>
          <span>제목 : {el.title} </span>
          <span>내용 : {el.contents} </span>
          <button onClick={onClickDelete(el._id)}> X </button>
        </div>
      ))}
      <form onSubmit={handleSubmit(onClickSubmit)}>
        작성자 : <input type="text" {...register("writer")} />
        비밀번호 : <input type="password" {...register("password")} />
        제목 : <input type="text" {...register("title")} />
        내용 : <input type="text" {...register("contents")} />
        <button>등록하기</button>
      </form>
      {/* 등록하기는 특정 아이디 없음 */}
    </div>
  );
}
