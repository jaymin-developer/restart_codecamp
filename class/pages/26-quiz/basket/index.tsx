import { useEffect, useState } from "react"

export default function BasketPage() {
  const [basketItems, setBasketItems] = useState([])

  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem("basket") || "[]")
    setBasketItems(basket)
  }, [])
  return (
    <div>
      <h1>나만의 장바구니(회원전용!!)</h1>
      {basketItems.map((el, index) => (
        <div key={el._id}>
          <span>상품 No.{index + 1}</span>
          <br />
          <span>작성자 : {el.writer}</span>
          <br />
          <span>제목 : {el.title}</span>
        </div>
      ))}
    </div>
  )
}
