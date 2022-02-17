// 동적 정규표현식

const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
]

function solution(s) {
  for (let i = 0; i < numbers.length; i++) {
    const regExp = new RegExp(numbers[i], "g")
    s = s.replace(regExp, i)
  }
  return Number(s)
}

// // 정적 정규표현식
// function solution(s){
// //     정규표현식
// //     사용 방법 : //(슬래시 열고 닫고)
// //     슬래시 안으로 검증할 문자열 넣어준다.
// //     g 글로벌, 전역 검사

//     s = s.replace(/zero/g, "0")
//     s = s.replace(/one/g, "1")
//     s = s.replace(/two/g, "2")
//     s = s.replace(/three/g, "3")
//     s = s.replace(/four/g, "4")
//     s = s.replace(/five/g, "5")
//     s = s.replace(/six/g, "6")
//     s = s.replace(/seven/g, "7")
//     s = s.replace(/eight/g, "8")
//     s = s.replace(/nine/g, "9")
//     return Number(s)
// }

// // forEach, split, join
// const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six',
//                 'seven', 'eight', 'nine']

// function solution(s) {
//     numbers.forEach( (el,i) => {
//         s = s.split(el).join(i)
//         console.log(s)
//     })
//     return Number(s)
// }

// 특정한 문자열을 해당되는 문자열로 변경
// let str = "abcdeb";
// str = str.replace("b", 2)
// console.log(str)
// 전체 바꾸는 건 replaceAll

// const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six',
//                 'seven', 'eight', 'nine']

// function solution(s) {
//     for( let i = 0; i < numbers.length; i++ ){
//         while( s.includes(numbers[i])){
//         s = s.replace(numbers[i], i)
//         }
//     }
//     return Number(s)
// }

// function solution(s) {
//     let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
//     var answer = s;

//     for(let i = 0; i < numbers.length; i++) {
//         let arr = answer.split(numbers[i]);
//         answer = arr.join(i);
//     }

//     return Number(answer);
// }
