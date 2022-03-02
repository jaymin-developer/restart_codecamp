import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationLikeBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../src/commons/types/generated/types";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export default function OptimisticUIPage() {
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: "621b4747155b2d0029673370",
      },
    }
  );
  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);

  const onClickOptimisticUI = () => {
    likeBoard({
      variables: {
        boardId: "621b4747155b2d0029673370",
      },
      //   refetchQueries: [
      //     {
      //       query: FETCH_BOARD,
      //       variables: { boardId: "621b4747155b2d0029673370" },
      //     },
      //   ],
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount || 0) + 1,
      },
      update(cache, { data }) {
        cache.writeQuery({
          query: FETCH_BOARD,
          variables: { boardId: "621b4747155b2d0029673370" },
          data: {
            fetchBoard: {
              _id: "621b4747155b2d0029673370",
              __typename: "Board",
              likeCount: data?.likeBoard,
            },
          },
        });
      },
    });
  };

  return (
    <div>
      <h1>옵티미스틱 UI</h1>
      <div>현재 카운트(좋아요) : {data?.fetchBoard.likeCount}</div>
      <button onClick={onClickOptimisticUI}>좋아요 올리기!!</button>
    </div>
  );
}
// 캐시에 먼저 받아주고 전달해준다.
