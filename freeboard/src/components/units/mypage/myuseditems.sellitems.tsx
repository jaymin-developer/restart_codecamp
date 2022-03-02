import { getMyDate2 } from "../../../commons/libraries/utils"
import * as S from "./mypage.styles"
import { v4 as uuidv4 } from "uuid"
import styled from "@emotion/styled"
import { useState } from "react"
import { gql, useQuery } from "@apollo/client"
import _ from "lodash"

const FETCH_USED_ITEMS_I_SOLD = gql`
  query fetchUseditemsISold($page: Int, $search: String) {
    fetchUseditemsISold(page: $page, search: $search) {
      _id
      name
      price
      soldAt
      createdAt
    }
  }
`

export const SearchTitle = styled.input`
  width: 100%;
  height: 50px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 10px;
  padding-left: 20px;
  margin: 10px 0px;
`

export default function SellItems(props) {
  const [keyword, setKeyWord] = useState("")

  const { data, refetch } = useQuery(FETCH_USED_ITEMS_I_SOLD)

  const getDebounce = _.debounce((data) => {
    refetch({ search: data, page: 1 })
    setKeyWord(data)
  }, 500)

  const onChangeSearch = (event) => {
    getDebounce(event.target.value)
  }

  return (
    <>
      <SearchTitle
        type="text"
        placeholder="상품을 검색해주세요."
        onChange={onChangeSearch}
      />
      <S.TableTop />
      <S.Row>
        <S.ColumnHeaderBasic>번호</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>상품명</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>판매가격</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>작성날짜</S.ColumnHeaderBasic>
      </S.Row>
      {data?.fetchUseditemsISold.map((el, index) => (
        <S.Row key={el._id}>
          <S.ColumnBasic>{index + 1}</S.ColumnBasic>
          <S.ColumnTitle id={el._id} onClick={props.onClickMoveToBoardDetail}>
            {el.name
              .replaceAll(keyword, `@#$%${keyword}@#$%`)
              .split("@#$%")
              .map((el) => (
                <span
                  key={uuidv4()}
                  style={{ color: keyword === el ? "red" : "black" }}
                >
                  {el}
                </span>
              ))}
            <span style={{ color: "blue" }}> {el.soldAt && `판매 완료`}</span>
          </S.ColumnTitle>
          <S.ColumnBasic>{el.price}</S.ColumnBasic>
          <S.ColumnBasic>{getMyDate2(el.createdAt)}</S.ColumnBasic>
        </S.Row>
      ))}
      <S.TableBottom />
    </>
  )
}
