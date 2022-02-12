function solution(participant, completion) {
  participant.sort() // 참가자 명단을 오름차순으로 정렬
  completion.sort() // 완주자 명단을 오름차순으로 정렬

  let answer = ""
  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) {
      // 참가자 명단과 완주자 명단을 비교했을 때
      // 완주자 명단에 없는 참가자를 찾은 후, 바로 반복문을 종료
      answer = participant[i]
      break
    }
  }

  return answer
}

function solution(participant, completion) {
  participant.sort() // 참가자 명단을 오름차순으로 정렬
  completion.sort() // 완주자 명단을 오름차순으로 정렬

  const answer = participant.filter((name, i) => {
    return name !== completion[i]
  })

  return answer[0]
}
