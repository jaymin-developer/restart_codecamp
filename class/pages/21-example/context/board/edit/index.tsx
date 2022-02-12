import { createContext } from "react"
import BoardWrite from "../../../../../src/components/units/21-contextapi/BoardWrite.container"

export const ExampleContext = createContext(null)
export default function ContextAPIEditPage() {
  return (
    <ExampleContext.Provider value={{ isEdit: true }}>
      <BoardWrite />
    </ExampleContext.Provider>
  )
}
