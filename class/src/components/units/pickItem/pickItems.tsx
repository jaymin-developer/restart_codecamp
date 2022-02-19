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
