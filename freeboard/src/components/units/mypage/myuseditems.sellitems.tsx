import { getMyDate2 } from "../../../commons/libraries/utils"
import * as S from "./mypage.styles"
import { v4 as uuidv4 } from "uuid"

export default function SellItems(props) {
  return (
    <>
      <S.TableTop />
      <S.Row>
        <S.ColumnHeaderBasic>번호</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>상품명</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>판매가격</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>작성날짜</S.ColumnHeaderBasic>
      </S.Row>
      {props.soldData?.fetchUseditemsISold.map((el, index) => (
        <S.Row key={el._id}>
          <S.ColumnBasic>{index + 1}</S.ColumnBasic>
          <S.ColumnTitle id={el._id} onClick={props.onClickMoveToBoardDetail}>
            {el.name
              .replaceAll(props.keyword, `@#$%${props.keyword}@#$%`)
              .split("@#$%")
              .map((el) => (
                <span
                  key={uuidv4()}
                  style={{ color: props.keyword === el ? "red" : "black" }}
                >
                  {el}
                </span>
              ))}
            <span style={{ color: "blue" }}>{el.soldAt && `판매 완료`}</span>
          </S.ColumnTitle>
          <S.ColumnBasic>{el.price}</S.ColumnBasic>
          <S.ColumnBasic>{getMyDate2(el.createdAt)}</S.ColumnBasic>
        </S.Row>
      ))}
      <S.TableBottom />
    </>
  )
}
