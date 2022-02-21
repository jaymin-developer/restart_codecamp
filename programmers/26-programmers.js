// 아스키 코드
// 어떠한 문자를 해당되는 숫자 데이터로 변환
// str = "a"
// str.charCodeAt() 코드로 변환, string.fromCharCode() 문자로 변환
// 소문자는 아스키 코드로 변환했을 때 97~122
// 대문자는 아스키 코드로 변환했을 때 65~90

function solution(s, n) {
  let answer = ""
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      answer += " "
      continue
    }
    let index = s[i].charCodeAt() + n
    if (index > 122 || (index > 90 && index - n < 97)) {
      // 소문자 z 122 를 넘어가거나
      // 대문자 Z 90 를 넘어가면서
      // 기존에 대문자이면서, 대문자 Z를 넘지 않을 때
      index -= 26
    }
    answer += String.fromCharCode(index)
  }
  return answer
}

// const lower = 'abcdefghijklmnopqrstuvwxyz'; // 소문자 알파벳만 저장
// const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 대문자 알파벳만 저장

// function solution(s, n) {
//     const answer = s.split("")
//                     .reduce( (acc, cur) => {
//                         if(cur === " "){
//                             return acc + " "
//                         }
//                         const word = lower.includes( cur ) ? lower : upper;
//                         let index = word.indexOf( cur ) + n;
//                         if( index >= 26 ){
//                             index -= 26
//                         }
//                         return acc + word[index]
//                     }, "")
//     return answer
// }

// const lower = 'abcdefghijklmnopqrstuvwxyz'; // 소문자 알파벳만 저장
// const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 대문자 알파벳만 저장

// function solution(s,n){
//     let answer = "";

//     for(let i=0; i < s.length; i++){
//         if(s[i] == " "){
//             answer += " "
//             continue
//         }
//         // s[i]가 소문자라면, 소문자 문자열 저장, 아니라면 대문자 문자열
//     const word = lower.includes( s[i] ) ? lower : upper
//     let index = word.indexOf( s[i] ) + n;

//         if( index >= 26 ) {
//             index -= 26
//         }
//         // console.log(s[i], word, index)
//         answer += word[index]
//     }
//     return answer
// }

// const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// function solution(s,n) {
//     let answer = ""

//     for (let i=0; i<s.length; i++){
//         if(s[i] === " "){
//             answer += " " //" " 혹은 s[i]
//             continue;
//         }
//         let index = alphabet.indexOf( s[i] )
//         const word = index > 25 ? alphabet.slice( 26, alphabet.length) // 대문자
//                                 : alphabet.slice( 0, 26)
//         index = word.indexOf( s[i] ) + n
//         // console.log(s[i], word[index % 26])
//         // return word[index % 26]
//         if( word[index] === undefined) {
//             index -= 26
//         }
//         answer += word[index]
//     }
//     return answer
// }

// function solution(s, n) {
//     var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     var lower = "abcdefghijklmnopqrstuvwxyz";
//     var answer= '';

//     for(var i =0; i <s.length; i++){
//         var text = s[i];
//         if(text == ' ') {
//             answer += ' ';
//             continue;
//         }
//         var textArr = upper.includes(text) ? upper : lower;
//         var index = textArr.indexOf(text)+n;
//         if(index >= textArr.length) index -= textArr.length;
//         answer += textArr[index];
//     }
//     return answer;
// }
