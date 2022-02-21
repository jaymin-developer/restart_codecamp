import { useState } from "react"
import { IBoard } from "../../../commons/types/generated/types"

export default function PickItems(props) {
  const [pick, setPick] = useState(false)
  //   const baskets = JSON.parse(localStorage.getItem("basket") || "[]")

  const onClickBasket = (el) => () => {
    // localStorage.getItem("Basket") //문자열임 "{}" 그래서 객체로 돌려놔야함
    const baskets = JSON.parse(localStorage.getItem("basket") || "[]")

    // 데이터가 있으면 basket에 더해나가고 없으면 빈객체에 더해나가고

    const temp = baskets.filter((basketEl: IBoard) => basketEl._id === el._id)
    // 같은게 있다면 필터링
    if (temp.length === 1) {
      alert("이미 장바구니에 담겨있습니다")
      return
    }

    // Board 인자 제거
    // const { __typename, ...newEl } = el
    baskets.push(el)
    localStorage.setItem("basket", JSON.stringify(baskets))
    console.log(`바스켓 ${JSON.stringify(baskets)}`)
    // setList(baskets)
    setPick(true)
  }

  const onClickCancel = (el) => () => {
    // 데이터가 있으면 basket에 더해나가고 없으면 빈객체에 더해나가고
    // 신경
    const baskets = JSON.parse(localStorage.getItem("basket") || "[]")
    baskets.splice(baskets.indexOf(el), 1)
    const list = baskets
    console.log(list)
    localStorage.removeItem("basket")
    localStorage.setItem("basket", JSON.stringify(list))
    setPick(false)

    // 기존
    // console.log(`el: ${JSON.stringify(el)}`)
    // list.splice(list.indexOf(el), 1)
    // console.log(`리스트 ${JSON.stringify(list)}`)
    // localStorage.removeItem("basket")
    // localStorage.setItem("basket", JSON.stringify(list))
    // setPick(false)
  }

  return (
    <div>
      <span>{props.el.writer}</span>
      <span>{props.el.title}</span>
      {console.log(`프롭스 el ${JSON.stringify(props.el)}`)}
      {pick ? (
        <button onClick={onClickCancel(props.el)}>담기 취소</button>
      ) : (
        <button onClick={onClickBasket(props.el)}>게시글 담기</button>
      )}
    </div>
  )
}

import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import {
  IBoard,
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types"

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`

// export default function QuizPage() {
//   const router = useRouter();
//   const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
//     FETCH_BOARDS
//   );

//   const onClickBasket = (el: IBoard) => () => {
//     const baskets = JSON.parse(localStorage.getItem("basket") || "[]");
//     const temp = baskets.filter((bel: IBoard) => bel._id === el._id);
//     if (temp.length === 1) {
//       alert("이미 장바구니에 존재한다.");
//       return;
//     }
//     const { _typename, ...prev } = el;
//     baskets.push(prev);
//     localStorage.setItem("basket", JSON.stringify(baskets));
//   };

//   const onClickDeleteBasket = (el: IBoard) => () => {
//     const baskets = JSON.parse(localStorage.getItem("basket") || "[]");

//     for (let i = 0; i < baskets.length; i++) {
//       if (baskets[i]._id === el._id) {
//         baskets.splice(i, 1);
//       }
//     }
//     localStorage.setItem("basket", JSON.stringify(baskets));
//   };
//   const onClickMoveToLogin = () => {
//     router.push("/quiz06/main");
//   };
//   return (
//     <div>
//       <div>
//         {data?.fetchBoards.map((el) => (
//           <div key={el._id}>
//             <span>{el.writer}</span>
//             <span>{el.title}</span>
//             <span>{el.contents}</span>
//             <span>{el.createdAt}</span>
//             <button onClick={onClickBasket(el)}>게시물 담기</button>
//             <button onClick={onClickDeleteBasket(el)}>담기 취소</button>
//           </div>
//         ))}
//       </div>
//       <button onClick={onClickMoveToLogin}>로그인 하러 가기</button>
//     </div>
//   );
// }

// 건님 코드
// import { gql, useQuery } from "@apollo/client";
// import { useEffect, useState } from "react";

// const FETCH_BOARDS = gql`
//   query fetchBoards {
//     fetchBoards {
//       _id
//       writer
//       title
//     }
//   }
// `;

// export default function Quiz060101() {
//   const { data } = useQuery(FETCH_BOARDS);
//   const [items, setItems] = useState<any>([]);
//   const onClickAdd = (item: any) => (_: any) => {
//     const items = JSON.parse(localStorage.getItem("0601") || "[]");
//     items.push(item);
//     localStorage.setItem("0601", JSON.stringify(items));
//     setItems(items);
//   };

//   useEffect(() => {
//     console.log(JSON.parse(localStorage.getItem("0601")));
//     setItems(JSON.parse(localStorage.getItem("0601") || "[]"));
//   }, []);

//   return (
//     <div style={{ display: "flex", justifyContent: "space-between" }}>
//       <div>
//         {data?.fetchBoards.map((el, idx) => {
//           return (
//             <div key={idx}>
//               <span>{el.writer}</span>|<span>{el.title}</span>
//               <button onClick={onClickAdd(el)}>
//                 {items.filter((item) => item._id === el._id).length > 0
//                   ? "담기 취소"
//                   : "게시물 담기"}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//       <div>
//         <div>장바구니</div>
//         {items.map((el) => {
//           return <div>{el.title}</div>;
//         })}
//       </div>
//     </div>
//   );
// }
