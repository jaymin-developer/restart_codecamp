import { gql, useQuery } from "@apollo/client"
import { getMyDate2 } from "../../../commons/libraries/utils"
import * as S from "./mypage.styles"

const FETCH_USED_ITEMS_PICKED = gql`
  query fetchUseditemsIPicked($search: String, $page: Int) {
    fetchUseditemsIPicked(search: $search, page: $page) {
      _id
      name
      price
      soldAt
      createdAt
    }
  }
`

export default function PickedItems(props) {
  const { data } = useQuery(FETCH_USED_ITEMS_PICKED, {
    variables: {
      page: 1,
      search: "",
    },
  })

  return (
    <>
      <S.TableTop />
      <S.Row>
        <S.ColumnHeaderBasic>번호</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>상품명</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>판매가격</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>작성날짜</S.ColumnHeaderBasic>
      </S.Row>
      {data?.fetchUseditemsIPicked.map((el, index) => (
        <S.Row key={el._id}>
          <S.ColumnBasic>{index + 1}</S.ColumnBasic>
          <S.ColumnTitle id={el._id} onClick={props.onClickMoveToBoardDetail}>
            {el.name}{" "}
            <span style={{ color: "blue" }}>{el.soldAt && `판매 완료`}</span>
            {/* {el.title
                    .replaceAll(props.keyword, `@#$%${props.keyword}@#$%`)
                    .split("@#$%")
                    .map((el) => (
                      <S.TextToken
                        key={uuidv4()}
                        isMatched={props.keyword === el}
                      >
                        {el}
                      </S.TextToken>
                    ))} */}
          </S.ColumnTitle>
          <S.ColumnBasic>{el.price}</S.ColumnBasic>
          <S.ColumnBasic>{getMyDate2(el.createdAt)}</S.ColumnBasic>
        </S.Row>
      ))}
      <S.TableBottom />
    </>
  )
}
