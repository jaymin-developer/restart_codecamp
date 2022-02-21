import { gql, useMutation, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import {
  DELETE_USED_ITEM,
  TOGGLE_USED_ITEM_PICK,
} from "./usedItemDetail.queries"
import UsedItemDetailUI from "./usedItemDetail.presenter"
import { useState } from "react"

const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      images
      createdAt
    }
  }
`

const BuyButton = styled.button`
  width: 200px;
  height: 70px;
  bottom: 0px;
  background-color: #e79d9d;
  color: white;
  position: fixed;
  z-index: 1;
`

export default function UsedItemDetail() {
  const router = useRouter()

  const [deleteUseditem] = useMutation(DELETE_USED_ITEM)
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK)
  // const {  } = useMutation(TOGGLE_USED_ITEM_PICK)
  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.id) },
  })

  const onClickDelete = async () => {
    try {
      await deleteUseditem({
        variables: { useditemId: String(router.query.id) },
      })
      alert("삭제가 완료되었습니다.")
      router.push("/usedItems")
    } catch (error) {
      alert(error.message)
    }
  }

  const onClickToggleUsedItemPick = () => async (event) => {
    try {
      const result = await toggleUseditemPick({
        variables: { useditemId: String(router.query.id) },
      })
      result.data.toggleUseditemPick === 0
        ? alert("상품을 찜했습니다!")
        : alert("찜을 취소했습니다!")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <UsedItemDetailUI
        onClickDelete={onClickDelete}
        onClickToggleUsedItemPick={onClickToggleUsedItemPick}
      />
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <BuyButton>
          {data?.fetchUseditem?.price} 원 <br /> 구매하기
        </BuyButton>
      </div>
    </>
  )
}
