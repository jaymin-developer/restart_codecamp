//내적

// 멘토님 풀이, reduce
function solution(a, b) {
  const answer = a.reduce((acc, cur, i) => {
    return acc + cur * b[i]
  }, 0)
  return answer
}

// 내 풀이
function solution(a, b) {
  let c = 0
  for (let i = 0; i < a.length; i++) {
    c = c + a[i] * b[i]
  }
  return c
}

// 제일 작은 수 제거하기

// 메서드를 활용한 짧은 코드
function solution(arr) {
  const min = Math.min(...arr)

  const answer = arr.filter((num) => {
    return num > min
  })
  return answer.length === 0 ? [-1] : answer
}

//for문과 if문으로
function solution(arr) {
  let answer = []
  //     // 1. 제일 작은 수를 찾는 과정
  let min = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i]
    }
  }
  //     // 제일 작은 수를 제외한 나머지
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== min) {
      answer.push(arr[i])
    }
  }

  return answer.length === 0 ? [-1] : answer
}
