// 둘 다 모를 때 씀

// 1. any 타입, 그냥 자바스크립트
export const getAny = (인자: any) => {
  const answer = 인자 + 2;
  return answer;
};

const myResult1 = getAny("철수");
console.log(myResult1);

// 2. unknown 타입, 타입스크립트 버전 올라가면서 생김. 뭘 넣어도 상관은 없는데 개발자한테 안전에 주의를 줌.
// 개발자에게 안전하게 코딩하도록 유도
const getUnknown = (인자: unknown) => {
  if (typeof 인자 === "number") {
    const answer = 인자 + 2;
    return answer;
  } else {
    return "숫자를 넣어주세요";
  }
};

const myResult2 = getUnknown("철수");
console.log(myResult2);
