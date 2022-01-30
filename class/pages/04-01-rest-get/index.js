import axios from "axios";
import { useState } from "react";

export default function RestGet() {
  const [aaa, setAaa] = useState("");

  //   async function zzz() {
  //     const result = await axios.get("https://koreanjson.com/posts/1");
  //     setAaa(result.data.title);
  //   }

  // 위에꺼는 호이스팅 문제가 발생할 수 있음. 화살표 함수로 그것을 막아줄 수 있음

  const zzz = async () => {
    const result = await axios.get("https://koreanjson.com/posts/1");
    setAaa(result.data.title);
  };

  return (
    <>
      <button onClick={zzz}>REST-API 요청하기</button>
      <div>{aaa}</div>
    </>
  );
}
