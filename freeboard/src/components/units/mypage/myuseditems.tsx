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
export const SearchTitle = styled.input`
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 10px;
  padding-left: 20px;
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
        <div>
          <SearchTitle
            type="text"
            placeholder="상품을 검색해주세요."
            onChange={props.onChangeSearch}
          />
        </div>
      </WrapperRightTop>
      <WrapperRightBody>
        {click ? (
          <SellItems
            soldData={props.soldData}
            keyword={props.keyword}
            onClickMoveToBoardDetail={props.onClickMoveToBoardDetail}
          />
        ) : (
          <PickedItems
            soldData={props.soldData}
            onClickMoveToBoardDetail={props.onClickMoveToBoardDetail}
          />
        )}
      </WrapperRightBody>
    </>
  )
}
