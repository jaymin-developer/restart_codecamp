// 싸이월드 했던 내용 복습
// setInterval(()=>{
//     document.getElementById("timer")?.innerText = "2:59"
// },1000)

export default function TaskQueuePage() {
  const onClickTimer = () => {
    console.log("=========시작!!!=========");

    // 바로 실행되지 않는 애들, 비동기 작업 axios도 비동기 작업, 백그라운드로 넘긴다음에 taskqueue로 보냄
    // 비동기작업(매크로큐에 들어감)
    setTimeout(() => {
      console.log("저는 setTimeou!! 매크로큐! 0초 뒤에 실행될 거에요 - 1"); // taskqueue
    }, 0);
    new Promise((resolve) => {
      resolve("철수");
    }).then((res) =>
      console.log("저는 Promise!! 마이크로큐!! 0초 뒤에 실행될 거에요! - 1")
    );

    setInterval(() => {
      console.log("저는 setInterval!! 매크로큐! 0초마다 실행될 거에요. ");
    }, 0);

    let sum = 0; // callStack
    for (let i = 0; i <= 9000000000; i += 1) {
      // 1씩 더하기
      sum = sum + 1;
    }

    new Promise((resolve) => {
      resolve("철수");
    }).then((res) =>
      console.log("저는 Promise!! 마이크로큐!! 0초 뒤에 실행될 거에요! - 2")
    );

    console.log("=========끝!!!=========");
  };

  return <button onClick={onClickTimer}>시작!!!</button>;
}
