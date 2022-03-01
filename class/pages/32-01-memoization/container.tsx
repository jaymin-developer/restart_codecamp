import { useCallback, useMemo, useState } from "react";
import MemoizationPresenterPage from "./presenter";

export default function MemoizationContainerPage() {
  console.log("컨테이너가 렌더링 됩니다!!!");

  let countLet = 0;
  const [countState, setCountState] = useState(0);

  const aaa = useMemo(() => Math.random(), []);
  // useEffect랑 같은 모양, return되는 값을 가운데에 두기
  console.log(aaa);
  // aaa가 다시 만들어지지 않음. 다시 만들고 싶으면 의존성 배열에 넣기
  // useMemo 거의 쓴 적 없음. 언제 쓰면 좋을까? 복잡한 계산을 많이 해야할 때
  // 한 번만 계산하고 그 값을 쓸 때만 쓰자. 복잡한 계산할 때만 쓰임

  const onClickCountLet = useCallback(() => {
    console.log(countLet + 1);
    countLet = countLet + 1;
  }, []);

  // const onClickCountState = useCallback(() => {
  //   // console.log(countState + 1);
  //   setCountState((prev) => prev + 1);
  // }, []);
  // useCallback은 prev, 메모리에서는 기존 함수 재사용. useCallback으로 함수를 기억해서 재사용. 스테이츠는 조심해서 활용하자. prev 활용해서.
  // 복잡한 계산은 useMemo
  // console이랑 return만 실행 나머지는 재사용함.

  // useMemo로 useCallback 만들어보기
  // useMemo는 값을 기억하여 재사용. 값이 함수라면?
  // const onClickCountState = useMemo(() => {
  //   return () => {
  //     // console.log(countState + 1);
  //     setCountState(countState + 1);
  //   };
  // }, []);

  // 다시 원래 함수
  const onClickCountState = () => {
    // console.log(countState + 1);
    setCountState((prev) => prev + 1);
  };

  return (
    <div>
      <div>=================</div>
      <h1>이것은 컨테이너 입니다!!!</h1>

      <div>카운트(let) : {countLet}</div>
      <button onClick={onClickCountLet}>카운트(let) + 1 올리기</button>

      <div>카운트(state) : {countState}</div>
      <button onClick={onClickCountState}>카운트(state) + 1 올리기</button>
      <div>=================</div>
      <MemoizationPresenterPage myCount={countState} />
    </div>
  );
}
