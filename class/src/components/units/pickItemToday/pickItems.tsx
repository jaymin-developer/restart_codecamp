import styled from "@emotion/styled"
import { useState } from "react"
import { getDate, NowDate, TodayDate } from "../../../commons/libraries/utils"
import { IBoard } from "../../../commons/types/generated/types"

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export default function PickItems(props) {
  const [pick, setPick] = useState(false)

  const onClickBasket = (el) => () => {
    const baskets = JSON.parse(localStorage.getItem(`${TodayDate()}`) || "[]")
    const temp = baskets.filter((basketEl: IBoard) => basketEl._id === el._id)
    if (localStorage.key(baskets) === TodayDate()) props.setBasketItems(baskets)
    if (temp.length === 1) {
      alert("이미 장바구니에 담겨있습니다")
      return
    }

    baskets.push(el)
    localStorage.setItem(`${TodayDate()}`, JSON.stringify(baskets))
    console.log(`바스켓 ${JSON.stringify(baskets)}`)
    setPick(true)
  }

  return (
    <Box>
      <div style={{ backgroundColor: "gray" }}>
        <span>작성자 : {props.el.writer}</span>
        <span>제목 : {props.el.title}</span>
        <button onClick={onClickBasket(props.el)}>게시글 보기</button>
      </div>
    </Box>
  )
}
