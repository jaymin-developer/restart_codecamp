import { useState } from "react"

export default function LetStateHello() {
  const hi = "반갑습니다"

  function onClickHi() {
    document.getElementById("hi").innerText = hi
  }

  const [hello, setHello] = useState("안녕하세요")

  function onClickHello() {
    setHello("반갑습니다")
  }
  return (
    <>
      document.getElementById
      <button id="hi" onClick={onClickHi}>
        안녕하세요
      </button>
      <br />
      state<button onClick={onClickHello}>{hello}</button>
    </>
  )
}
