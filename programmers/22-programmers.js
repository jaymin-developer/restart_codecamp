const answerTable = [
    // 1번 수포자가 찍는 방식
    [1, 2, 3, 4, 5],
//     2번 수포자가 찍는 방식
    [2, 1, 2, 3, 2, 4, 2, 5],
//     3번 수포자가 찍는 방식
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
]

function solution(answers){
    const answer = answerTable.map( (el, i) => {
        const score = answers.reduce((acc, cur, l)=>{
            return acc + (el[l % el.length] === cur ? 1 : 0)
        }, 0)
        return { student : i + 1, score}
    })
//     가장 많이 맞춘 학생의 점수
    const biggest = Math.max(...answer.map(el => {return el.score}))
    const answer2 = answer.filter( el => {return el.score === biggest}).map(el => {return el.student})
    return answer2
}

// 1번 수포자가 찍는 방식
// [1, 2, 3, 4, 5]
// 2번 수포자가 찍는 방식
// [2, 1, 2, 3, 2, 4, 2, 5]
// 3번 수포자가 찍는 방식
// [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]

// 1번 문제
// 1번 학생 : 1번
// 2번 학생 : 2번
// 3번 학생 : 3번

// 6번 문제
// 1번 학생 : 1번
// 2번 학생 : 4번
// 3번 학생 : 2번

// 9번 문제
// 1번 학생 : 4번
// 2번 학생 : 2번
// 3번 학생 : 
// const answerTable = [
//     // 1번 수포자가 찍는 방식
//     [1, 2, 3, 4, 5],
// //     2번 수포자가 찍는 방식
//     [2, 1, 2, 3, 2, 4, 2, 5],
// //     3번 수포자가 찍는 방식
//     [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
// ]

// function solution(answers){
// //     학생들의 점수를 저장하는 배열 (앞에서부터 1번 학생의 점수, 2번 학생의 점수, 3번 학생의 점수)
//     const score = [0, 0, 0]
    
//     for(let i = 0; i < answers.length; i++){
//         for(let l=0; l < answerTable.length; l++){
//             if(answers[i] === answerTable[l][i% answerTable[l].length]){
//                 score[l]++;
//             }
//         }
//     }
//     const biggest = Math.max(...score)
    
//     const answer = []
//     for( let i = 0; i < score.length; i++ ){
//         console.log(score[i], biggest)
//         if( biggest === score[i] ){
            
//             answer.push( i + 1 )
//         }
//     }
//     return answer
// }

// function solution(answers) {
//     var answer = [];
//     var a1 = [1, 2, 3, 4, 5];
//     var a2 = [2, 1, 2, 3, 2, 4, 2, 5]
//     var a3 = [ 3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

//     var a1c = answers.filter((a,i)=> a === a1[i%a1.length]).length;
//     console.log(a1c)
//     var a2c = answers.filter((a,i)=> a === a2[i%a2.length]).length;
//     console.log(a2c)
//     var a3c = answers.filter((a,i)=> a === a3[i%a3.length]).length;
//     console.log(a3c)
//     var max = Math.max(a1c,a2c,a3c);

//     if (a1c === max) {answer.push(1)};
//     if (a2c === max) {answer.push(2)};
//     if (a3c === max) {answer.push(3)};
//     return answer;
// }