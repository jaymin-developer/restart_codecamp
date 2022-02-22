// 싸이월드 했던 내용 복습
// setInterval(()=>{
//     document.getElementById("timer")?.innerText = "2:59"
// },1000)

export default function TaskQueuePage() {
  const onClickTimer = () => {
    console.log("=========시작!!!=========");

    // 바로 실행되지 않는 애들, 비동기 작업 axios도 비동기 작업, 백그라운드로 넘긴다음에 taskqueue로 보냄
    setTimeout(() => {
      console.log("1초 뒤에 실행될 거에요!!!"); // taskqueue
    }, 1000);

    let sum = 0; // callStack
    for (let i = 0; i <= 9000000000; i += 1) {
      // 1씩 더하기
      sum = sum + 1;
    }

    console.log("=========끝!!!=========");
  };

  return <button onClick={onClickTimer}>시작!!!</button>;
}
