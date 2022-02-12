export default function MapElPage() {
  //   // map은 선언과 할당 가능 forEach는 불가능
  //   ["철수", "영희", "훈이"].forEach((el, index) => {
  //     console.log("el", el);
  //     console.log("index", index);
  //   });

  //   //   매개변수 변경한 방법
  //   ["철수", "영희", "훈이"].forEach((a, b) => {
  //     console.log("a", a);
  //     console.log("b", b);
  //   });

  //   함수선언식 방법
  //   ["철수", "영희", "훈이"].forEach(function (a, b) {
  //     console.log("a", a);
  //     console.log("b", b);
  //   });

  //   함수선언식 방법 el과 index 바꾸기
  ["철수", "영희", "훈이"].forEach(function (index, el) {
    console.log("el", index);
    console.log("index", el);
  });

  return <></>;
}
