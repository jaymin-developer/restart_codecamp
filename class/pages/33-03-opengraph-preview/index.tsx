import axios from "axios";
import { useEffect } from "react";

// 디스코드 개발자
export default function OpenGraphPreview() {
  useEffect(() => {
    const getOpenGraph = async () => {
      const result = await axios.get("https://www.gmarket.co.kr/"); // daum.net 등은 CORS 차단 당하므로 백엔드에서 요청하는 것이 일반적
      //   console.log(result.data);
      //   console.log(result.data.split("<meta "));

      //   console.log(
      //     result.data.split("<meta ").filter((el) => el.includes("og"))
      //   );
      const opengraph = result.data
        .split("<meta ")
        .filter((el: string) => el.includes("og:url"))[0]
        .split(" ");

      console.log(
        opengraph[1].replaceAll('content="', "").replaceAll('"/>', "")
      );
    };
    getOpenGraph();
  }, []);

  return <div></div>;
}

// 조금 더 고급적인 내용을 다루기 위해서 서버사이드렌더링을 해야하는 이유가 있음
