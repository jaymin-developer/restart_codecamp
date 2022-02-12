function solution(n, m) {
  // 최대공약수 : 두 수의 약수 중에서 (공통되는) 제일 큰 수
  // 최소공배수 : 두 수의 배수 중에서 (공통되는) 제일 작은 수

  // 최대공약수 구하기
  let max = 0 // 제일 큰 값
  for (let i = 1; i <= m; i++) {
    if (n % i === 0 && m % i === 0) {
      max = i
    }
  }

  // 최소공배수 구하기
  let min = 0
  for (let i = m; i <= n * m; i += m) {
    if (i % n === 0) {
      min = i
      break
    }
  }
  return [max, min]
}

function solution(n, m) {
  // 유클리드 호제법
  // - 최대공약수를 구하기 위한 알고리즘 (공식)

  // a 를 b 로 나눴을 때 ( a 가 b 보다 클 경우 ) === 큰 수에서 작은 수를 나눴을 때
  // 나머지 값이 0 이 되면, 작은 수가 최대공약수가 된다.
  // 0이 되지 않으면 작은 수가 큰 수가 되고, 나머지 값이 작은 수가 된다.
  // 반복했을 때에 0이 나오면, 작은 수가 최대공약수가 된다.

  let a = m // 큰 수
  let b = n // 작은 수
  let r = 0 // a 를 b 로 나눴을 때에 나머지 값을 저장

  while (a % b > 0) {
    r = a % b
    a = b // 큰 수에 작은 수를 할당
    b = r // 작은 수에 나머지 값 할당
  }

  // 최소공배수는 두 수를 곱한 값에 최대공약수를 나눈 값
  return [b, (n * m) / b]
}
