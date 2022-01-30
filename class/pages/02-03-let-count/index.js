import { useState } from "react";

export default function LetCount() {
  let count = 0;

  function onClickCount() {
    count = count + 1;
    document.getElementById("count").innerText = count;
  }

  return (
    <>
      <div id="count">0</div>
      <button onClick={onClickCount}>카운트 증가!</button>
    </>
  );
}
