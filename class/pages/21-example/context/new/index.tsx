// import { createContext } from "react"
import BoardWrite from "../../../../src/components/units/21-contextapi/BoardWrite.container"
import { ExampleContext } from "../../../../pages/21-example/context/board/edit"

export default function ContextAPINewPage() {
  return (
    <ExampleContext.Provider value={{ isEdit: false }}>
      <BoardWrite />
    </ExampleContext.Provider>
  )
}
