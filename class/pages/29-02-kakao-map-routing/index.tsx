import Link from "next/link";
import { useRouter } from "next/router";

export default function KakaoMapPage() {
  const router = useRouter();
  const onClickMoveToMap = () => {
    router.push("/29-03-kakao-map-routed");
  };

  return (
    <div>
      {/* 방법 1 router, 잘 안 된다. */}
      <button onClick={onClickMoveToMap}>맵으로 이동하기</button>

      {/* Link는 router랑 동일하지만 다름. 시맨틱 요소 중요하다. a태그는 아님. Link는 시멘틱으로 검색을 더 잘하게끔 */}
      {/* <Link href="/29-03-kakao-map-routed">
        <a>맵으로 이동하기!!</a>
      </Link> */}

      {/* 이거는 잘되네..?  */}
      {/* <a href="/29-03-kakao-map-routed">맵으로 이동하기</a> */}

      {/* app.tsx에 지도 다운로드 */}
    </div>
  );
}
