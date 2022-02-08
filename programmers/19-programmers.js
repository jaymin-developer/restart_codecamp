let a = new Date()
// new Date(2016, 5 - 1, 24)
a.getDate() //일
a.getFullYear() //년
a.getMonth() + 1 //월
a.getDay() //일요일을 기준으로 며칠 지났는지

const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

function solution(a, b) {
  const answer = new Date(2016, a - 1, b).getDay()
  return week[answer]
}

// const month = {
//     1 : 31,
//     2 : 29,
//     3 : 31,
//     4 : 30,
//     5 : 31,
//     6 : 30,
//     7 : 31,
//     8 : 31,
//     9 : 30,
//     10 : 31,
//     11 : 30,
//     12 : 31
// }
// const week = [ "FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU" ]

// function solution(a,b){
//     const answer = new Array(a)
//                         .fill(1)
//                         .reduce((acc, cur, i ) => {
//                             console.log(acc, cur, i)
//                             const mn = cur + i;
//                             return acc + ( mn !== a
//                                           //이전 월일 경우
//                                          ? month[mn]
//                                           // 해당 월일 경우
//                                          : b-1
//                                          )
//                         }, 0)
//     return week[ answer % 7]
// }

// const month = {
//     1 : 31,
//     2 : 29,
//     3 : 31,
//     4 : 30,
//     5 : 31,
//     6 : 30,
//     7 : 31,
//     8 : 31,
//     9 : 30,
//     10 : 31,
//     11 : 30,
//     12 : 31
// }
// const week = [ "FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU" ]

// function solution(a,b){
// //     총 일수를 저장하는 변수
//     let days = 0;

//     for( let i=1; i< a; i++) {
//         days += month[i]
//     }
//     days += b - 1
//     return week[days % 7]
// }
