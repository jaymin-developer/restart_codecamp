import styled from "@emotion/styled"
import { useState } from "react"
import PickedItems from "./myuseditems.pickeditmes"
import SellItems from "./myuseditems.sellitems"

const WrapperRightTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const WrapperRightBody = styled.div`
  width: 100%;
`

export default function MyUsedItemsPage(props) {
  const [click, setClick] = useState(true)

  const onClickOnOff = () => {
    setClick((prev) => !prev)
  }

  return (
    <>
      <WrapperRightTop>
        <div style={{ display: "flex" }}>
          <span
            onClick={onClickOnOff}
            style={{
              cursor: "pointer",
              color: click === true ? "darkred" : "black",
              marginRight: "10px",
            }}
          >
            나의 상품
          </span>
          |
          <span
            onClick={onClickOnOff}
            style={{
              cursor: "pointer",
              color: click === true ? "black" : "darkred",
              marginLeft: "10px",
            }}
          >
            나의 찜
          </span>
        </div>
      </WrapperRightTop>
      <WrapperRightBody>
        {click ? (
          <SellItems
            onClickMoveToBoardDetail={props.onClickMoveToBoardDetail}
          />
        ) : (
          <PickedItems
            onClickMoveToBoardDetail={props.onClickMoveToBoardDetail}
          />
        )}
      </WrapperRightBody>
    </>
  )
}
