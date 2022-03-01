export default function PromiseAllPage() {
  const onClickPromise = async () => {
    console.time("Promise시작!!");
    const result1 = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("철수");
      }, 3000);
    });

    console.log(result1);

    const result2 = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("영희");
      }, 3000);
    });

    console.log(result2);

    const result3 = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("훈이");
      }, 3000);
    });

    console.log(result3);
    console.timeEnd("Promise시작!!");
  };

  // fulfilled 이행 완료
  // rejected 거절
  // pending 상태 기다리는 중

  const onClickPromiseAll = async () => {
    // 한 번에 기다리기 때문에 Promise.all
    // 1. 하나하나 각각 입력하는 방법
    // console.time("PromiseAll시작!!");
    // const results = await Promise.all([
    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve("철수");
    //     }, 3000);
    //   }),

    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve("영희");
    //     }, 3000);
    //   }),

    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve("훈이");
    //     }, 3000);
    //   }),
    // ]);
    // console.log(results);
    // console.timeEnd("PromiseAll시작!!");

    // 2. map을 사용해서 간소화하기
    console.time("PromiseAll시작!!");
    const classmates = ["철수", "영희", "훈이"];
    // classmates 업로드 파일로 바꾸기
    // * Promise.race 먼저 끝난 애 받아오기
    const results = await Promise.all(
      classmates.map(
        (el) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(el);
            }, 3000);
          })
      )
    );
    console.log(results);
    console.timeEnd("PromiseAll시작!!");
  };

  return (
    <>
      <button onClick={onClickPromise}>시작하기!!</button>
      <button onClick={onClickPromiseAll}>시작하기!! (Promise.all)</button>
    </>
  );
}
