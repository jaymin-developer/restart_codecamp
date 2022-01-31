export default function TypescriptPage() {
  // 타입 추론
  // let aaa = "안녕하세요";
  // aaa = 3;

  // 문자 타입
  // let bbb : string;
  // bbb = 123 에러
  // bbb="반갑습니다"

  // 숫자타입
  // let ccc : number = 5
  // ccc = "asdf"

  //불린 타입
  // let ddd : boolean
  // ddd = 123
  // ddd = "asdf"
  // ddd = true

  //배열타입
  let eee: number[] = [1, 2, 3, 4, 5, 6];
  let fff: string[] = ["철수", "영희", "훈이"];
  let ggg: (string | number)[] = [1, 2, 3, 4, "철수", "영희"];
  let hhh: string[] | number[] = [1, 2, 3];

  //객체타입, 우리가 만들어줘야한다.
  interface IProfile {
    name: string;
    age: number | string;
    school: string;
  }

  const profile: IProfile = {
    name: "철수",
    age: 8,
    school: "다람쥐초등학교",
  };

  return <div>타입스크립트 연습!!</div>;
}
