import { gql, useQuery } from "@apollo/client";
import { IBoard } from "../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
    }
  }
`;

export default function BasketPage() {
  const { data } = useQuery(FETCH_BOARDS);

  const onClickBasket = (el: IBoard) => () => {
    console.log(el);

    const baskets = JSON.parse(localStorage.getItem("basket") || "[]");
    const temp = baskets.filter((basketEl) => basketEl._id === el._id);
    if (temp.length === 1) {
      alert("이미 담은 물품!");
      return;
    }

    // delete el.__typename
    const { __typename, ...newEl } = el;
    temp.push(newEl);
    localStorage.setItem("basket", JSON.stringify(temp));
  };

  return (
    <div>
      {data?.fetchBoards.map((el: IBoard) => (
        <div key={el._id}>
          <span>{el.writer}</span>
          <span>{el.title}</span>
          <button onClick={onClickBasket(el)}>장바구니담기</button>
        </div>
      ))}
    </div>
  );
}
