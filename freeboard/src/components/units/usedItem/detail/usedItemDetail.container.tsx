import { gql, useMutation, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { DELETE_USED_ITEM } from "./usedItemDetail.queries"
import UsedItemDetailUI from "./usedItemDetail.presenter"

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
  return (
    <>
      <UsedItemDetailUI onClickDelete={onClickDelete} />
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <BuyButton>
          {data?.fetchUseditem?.name} <br /> 구매하기
        </BuyButton>
      </div>
    </>
  )
}
