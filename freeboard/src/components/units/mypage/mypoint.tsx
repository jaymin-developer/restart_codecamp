import styled from "@emotion/styled"
import { useState } from "react"
import AllHistory from "./mypoint.all"
import BuyHistory from "./mypoint.buy"
import ChargeHistory from "./mypoint.charge"
import SellHistory from "./mypoint.sell"

const WrapperRightTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const WrapperRightBody = styled.div`
  width: 100%;
`

export default function MyPointPage() {
  const [allHistory, setAllHistory] = useState(true)
  const [chargeHistory, setChargeHistory] = useState(false)
  const [buyHistory, setBuyHistory] = useState(false)
  const [sellHistory, setSellHistory] = useState(false)

  const onClickAll = () => {
    setAllHistory(true)
    setChargeHistory(false)
    setBuyHistory(false)
    setSellHistory(false)
  }

  const onClickCharge = () => {
    setAllHistory(false)
    setChargeHistory(true)
    setBuyHistory(false)
    setSellHistory(false)
  }

  const onClickBuy = () => {
    setAllHistory(false)
    setChargeHistory(false)
    setBuyHistory(true)
    setSellHistory(false)
  }

  const onClickSell = () => {
    setAllHistory(false)
    setChargeHistory(false)
    setBuyHistory(false)
    setSellHistory(true)
  }

  return (
    <>
      <WrapperRightTop>
        <div style={{ display: "flex" }}>
          <span
            onClick={onClickAll}
            style={{
              cursor: "pointer",
              color: allHistory === true ? "darkred" : "black",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            전체 내역
          </span>
          |
          <span
            onClick={onClickCharge}
            style={{
              cursor: "pointer",
              color: chargeHistory === true ? "darkred" : "black",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            충전내역
          </span>
          |
          <span
            onClick={onClickBuy}
            style={{
              cursor: "pointer",
              color: buyHistory === true ? "darkred" : "black",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            구매내역
          </span>
          |
          <span
            onClick={onClickSell}
            style={{
              cursor: "pointer",
              color: sellHistory === true ? "darkred" : "black",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            판매내역
          </span>
        </div>
      </WrapperRightTop>
      <WrapperRightBody>
        {allHistory && <AllHistory />}
        {chargeHistory && <ChargeHistory />}
        {buyHistory && <BuyHistory />}
        {sellHistory && <SellHistory />}
      </WrapperRightBody>
    </>
  )
}
