import { useState } from "react"

export default function StateCount() {
  let count1 = 0
  function onClickCountUp1() {
    count1 = count1 + 1
    document.getElementById("count1").innerText = count1
  }

  const [count, setCount] = useState(0)

  const onClickCountUp = () => {
    setCount(count + 1)
  }
  return (
    <>
      {" "}
      <div id="count1">0</div>
      <button onClick={onClickCountUp1}>카운트 증가</button>
      <div>
        state {count}
        <button onClick={onClickCountUp}>카운트 증가</button>
      </div>
    </>
  )
}
