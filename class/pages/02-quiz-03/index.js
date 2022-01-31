import { useState } from "react"

export default function Number() {
  const [stateToken, SetStateToken] = useState("")

  const token = Math.round(Math.random() * 100000)
  const paddedToken = String(token).padStart(6, "0")
  function getToken() {
    document.getElementById("number").innerText = paddedToken
  }

  function onClickGetToken() {
    SetStateToken(paddedToken)
  }

  return (
    <>
      <div>
        document.getElementById
        <div id="number"></div>
        <button onClick={getToken}>인증번호 받기</button>
      </div>

      <div>
        <div>{stateToken}</div>
        <button onClick={onClickGetToken}>인증번호 받기</button>
      </div>
    </>
  )
}
