// 음양 더하기
function solution(absolutes, signs) {
  const answer = absolutes.reduce((cu, el, i) => {
    return signs[i]
      ? cu + el // true 일 경우 (양수) 더해준다.
      : cu - el // false 인 경우 (음수) 빼준다.
  }, 0)
  return answer
}

// function solution(absolutes, signs) {
//     let answer = 0;
//     for( let i = 0; i < absolutes.length; i++ ) {
//         answer += signs[i] ? absolutes[i] : -absolutes[i]
//     }

//     return answer;
// }

// 하샤드 수
function solution(x) {
  const answer = x
    .toString()
    .split("")
    .reduce((acc, cur) => {
      return acc / 1 + cur / 1
    }, 0) //뒤에 0은 초기값
  return x % answer === 0 ? true : false
}

// function solution(x){
//     const answer = x.toString()
//                     .split("")
//                     .reduce((acc, cur) => {
//                         return acc/1 + cur/1
//                     })
//     return x % answer === 0 ? true : false
// }

// function solution(x) {
//     x = String(x)
//     let answer =0;
//     for(let i=0; i<x.length; i++){
//         answer += x[i]/1
//     }
//     return x % answer === 0 ? true : false
// }
