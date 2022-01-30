import { useState } from "react";

export default function StateHello() {
  const [hello, setHello] = useState("안녕하세요.");

  function onClickChange() {
    setHello("반갑습니다");
  }

  return (
    <>
      <div>{hello}</div>
      <button onClick={onClickChange}>클릭!</button>
    </>
  );
}
