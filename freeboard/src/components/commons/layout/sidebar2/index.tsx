import { gql, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { TodayDate } from "../../../../commons/libraries/utils"

const Wrapper = styled.div`
  min-width: 20%;
  padding: 30px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 150px;
`

export default function LayoutSidebar2() {
  const [list, setList] = useState([])

  useEffect(() => {
    console.log("시작")
    setList(JSON.parse(localStorage.getItem(`${TodayDate()}`) || "[]"))
    return () => {
      console.log("바이")
      setList(JSON.parse(localStorage.getItem(`${TodayDate()}`) || "[]"))
    }
  }, [])

  return (
    <Wrapper>
      <div style={{ backgroundColor: "lightgray" }}>
        <p style={{ textAlign: "center" }}>오늘 본 상품</p>
        {list.map((el, index) => (
          <div key={el._id}>
            {el.images[0] ? (
              <img
                src={`https://storage.googleapis.com/${el.images[0]}`}
                width={"50%"}
              />
            ) : (
              ""
            )}
            <div>상품명 : {el.name}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
