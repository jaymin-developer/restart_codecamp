import { useState } from "react"

export default function StatePrevPage() {
  const [count, setCount] = useState(0)

  function onClickCount() {
    // 1. 화살표 함수
    // setCount((prev) => prev + 1);

    // 2. 그냥 함수
    setCount(function (prev) {
      // 로직도 추가 가능
      // 로직도 추가 가능
      return prev + 1
    })

    // 3. 매개변수 바꾸기
    // setCount((이전) => 이전 + 1);
  }
  return (
    <>
      <div>현재 카운트 : {count}</div>
      <button onClick={onClickCount}>카운트 증가</button>
    </>
  )
}
