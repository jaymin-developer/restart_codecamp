import { useState } from "react";

export default function StateCount() {
  const [count, setCount] = useState(0);

  function onClickCount() {
    setCount(count + 1);
  }

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCount}>카운트 증가!</button>
    </>
  );
}
