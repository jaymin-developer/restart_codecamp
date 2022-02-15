import { MouseEvent } from "react"

export default function HofPage() {
  const onClickButton =
    (aaa: number) => (event: MouseEvent<HTMLButtonElement>) => {
      console.log(aaa)
    }

  return (
    <div>
      <h1>HOF 퀴즈 페이지입니다!!!</h1>
      <button onClick={onClickButton(123)}>버튼</button>
    </div>
  )
}
