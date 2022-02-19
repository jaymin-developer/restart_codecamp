import { gql, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { TodayDate } from "../../../src/commons/libraries/utils"
import { IBoard } from "../../../src/commons/types/generated/types"
import PickItems from "../../../src/components/units/pickItemToday/pickItems"

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      createdAt
    }
  }
`

export default function BasketPage() {
  const { data } = useQuery(FETCH_BOARDS)
  const [basketItems, setBasketItems] = useState([])

  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem(`${TodayDate()}`) || "[]")
    console.log(localStorage.key(basket))
  }, [basketItems])

  return (
    <div>
      <div>
        {data?.fetchBoards.map((el: IBoard) => (
          <PickItems
            key={el._id}
            el={el}
            setBasketItems={setBasketItems}
          ></PickItems>
        ))}
      </div>
      <div>오늘 본 게시글</div>
      {basketItems.map((el: IBoard) => (
        <div key={el._id}>
          <span>작성자 : {el.writer}</span>
          <span>타이틀 : {el.title}</span>
        </div>
      ))}
    </div>
  )
}
