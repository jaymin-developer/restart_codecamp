// new Set 만으로
function solution(nums) {
  const answer = new Set(nums).size
  const limit = nums.length / 2
  return limit >= answer ? answer : limit
}

// new Set 그리고
// function solution(nums){
//     const answer = new Set([])

//     nums.forEach( monster => {
//         if( (nums.length/2) > answer.size ){
//         answer.add( monster )
//         }
//     })
//     return answer.size
// }

// new Set
// function solution(nums){
//     const answer = new Set();

//     for( let i=0; i<nums.length; i++){
//         if( (nums.length/2) !== answer.size ){
//         answer.add( nums[i])
//         }
//     }
//     return answer.size
// }

// function solution(nums){
//     const answer = []
//     const limit = nums.length/2
//     for(let i = 0; i < nums.length; i++){
// //         중복이 되지 않으면서
// //         n/2 를 넘지 않을 때만 push
//         if (answer.includes( nums[i] ) === false &&
//            answer.length !== limit
//            )
//         answer.push( nums[i] )
//     }
//     return answer.length
// }
