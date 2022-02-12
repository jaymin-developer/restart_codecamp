import { createContext } from "react"
import BoardWrite from "../../src/components/units/21-contextapi/BoardWrite.container"

export const ExampleContext = createContext(null)
export default function ContextAPIPage() {
  // const myValues = {
  //   isEdit: false,
  // };
  return (
    <ExampleContext.Provider value={{ isEdit: false }}>
      {/* value에 객체 */}
      {/* <ExampleContext.Provider value={myValues}> */}
      {/* myValues를 선언해서 넣어줄수도 있음 */}
      <BoardWrite />
    </ExampleContext.Provider>
  )
}

// true => 수정
// false => 등록

// createContext 저장하고
// useContext 여기서 뽑아쓴다
