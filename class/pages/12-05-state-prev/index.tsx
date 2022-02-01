import { useState } from "react"

export default function StatePrevPage() {
  const [count, setCount] = useState(0)

  const onClickCountUp = () => {
    //  setCount(count + 1)
    //  setCount(count + 1)
    //  setCount(count + 1)
    //  setCount(count + 1)
    //  setCount(count + 1)
    // 임시저장 공간에 넣온 거라 0 -> 1로 계속 저장만 함
    setCount((prev) => prev + 1)
    // 임시 저장 공간의 값을 찾음
    setCount((prev) => prev + 1)
    setCount((prev) => prev + 1)
    setCount((prev) => prev + 1)
    setCount((prev) => prev + 1)
  }

  return (
    <div>
      <div>현재카운트 : {count}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!</button>
    </div>
  )
}
