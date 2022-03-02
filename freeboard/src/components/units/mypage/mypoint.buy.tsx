import { gql, useQuery } from "@apollo/client"
import { getMyDate2 } from "../../../commons/libraries/utils"
import * as S from "./mypage.styles"

const FETCH_POINT_TRANSACTION_OF_BUYING = gql`
  query fetchPointTransactionsOfBuying {
    fetchPointTransactionsOfBuying {
      _id
      useditem {
        name
        seller {
          _id
        }
      }
      amount
      balance
      updatedAt
    }
  }
`

export default function BuyHistory() {
  const { data } = useQuery(FETCH_POINT_TRANSACTION_OF_BUYING)
  console.log(data)
  return (
    <>
      <S.Row>
        <S.ColumnHeaderBasic>거래일</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>상품명</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>거래 내역</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>거래 후 잔액</S.ColumnHeaderBasic>
        {/* <S.ColumnHeaderBasic>판매자</S.ColumnHeaderBasic> */}
      </S.Row>
      {data?.fetchPointTransactionsOfBuying.map((el) => (
        <S.Row key={el._id}>
          <S.ColumnBasic>{getMyDate2(el.updatedAt)}</S.ColumnBasic>
          <S.ColumnTitle>{el.useditem.name}</S.ColumnTitle>
          <S.ColumnBasic style={{ color: "blue" }}>{el.amount}</S.ColumnBasic>
          <S.ColumnBasic>{el.balance}원</S.ColumnBasic>
          {/* <S.ColumnBasic>{el.useditem.seller?.email}</S.ColumnBasic> */}
        </S.Row>
      ))}
    </>
  )
}
