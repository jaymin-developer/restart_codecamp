import { memo } from "react"

function MemoizationPresenterPage() {
  console.log("프리젠터가 렌더링됩니다!!!")
  return (
    <div>
      <div>=================</div>
      <h1>이것은 프리젠터 입니다!!!</h1>
      <div>=================</div>
    </div>
  )
}

export default memo(MemoizationPresenterPage)
