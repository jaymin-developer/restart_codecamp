import Head from "next/head";
import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage() {
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    // 마커를 사용할 때 map 사용
    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  return (
    <div>
      <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=051cf83d4ac7658c907de1263c1cea25"
          //   카카오 디벨로퍼스에서 사이트 도메인이 같아야함, 키는 백엔드에다가 두자.
        ></script>
      </Head>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
}
