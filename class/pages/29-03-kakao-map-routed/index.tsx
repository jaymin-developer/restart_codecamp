import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage() {
  useEffect(() => {
    // 여기서 직접 다운로드 받고, 다 받을때까지 기다렸다가 그려주기!!
    const script = document.createElement("script"); // <script></script> 태그를 만들어줌
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=051cf83d4ac7658c907de1263c1cea25&autoload=false";
    document.head.appendChild(script); // html 문서에 head부분에 자식태그로 script를 넣어줘

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(
            37.484760267919775,
            126.8964422733376
          ), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };
        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        const imageSrc =
          "https://lh3.googleusercontent.com/-YshclaASnJc/AAAAAAAAAAI/AAAAAAAAAAA/VZs1S_CnVGk/s44-p-k-no-ns-nd/photo.jpg"; // 마커이미지의 주소입니다
        const imageSize = new window.kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
        const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          37.484760267919775,
          126.8964422733376
        );

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent: any) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            const latlng = mouseEvent.latLng;

            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);
          }
        );
      });
    };
  }, []);

  return (
    <div>
      {/* <Head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=051cf83d4ac7658c907de1263c1cea25"
          //   카카오 디벨로퍼스에서 사이트 도메인이 같아야함, 키는 백엔드에다가 두자.
        ></script>
      </Head> */}
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
}
