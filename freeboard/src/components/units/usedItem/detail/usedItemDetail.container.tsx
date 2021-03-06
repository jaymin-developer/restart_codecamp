import Head from "next/head"
import { gql, useMutation, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import {
  DELETE_USED_ITEM,
  TOGGLE_USED_ITEM_PICK,
} from "./usedItemDetail.queries"
import UsedItemDetailUI from "./usedItemDetail.presenter"
import { useEffect, useState } from "react"
import { getMyDate } from "../../../../commons/libraries/utils"

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
      pickedCount
      soldAt
      tags
    }
  }
`

const FETCH_USED_ITEMS_PICKED = gql`
  query fetchUseditemsIPicked($search: String, $page: Int) {
    fetchUseditemsIPicked(search: $search, page: $page) {
      _id
      name
      contents
    }
  }
`

const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
      name
      remarks
      price
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
  const [pick, setPick] = useState(false)
  // const { data } = useQuery(FETCH_USER_LOGGED_IN)

  const [deleteUseditem] = useMutation(DELETE_USED_ITEM)
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK)
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
    { variables: { useritemId: String(router.query.id) } }
  )

  const { data: itemData } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.id) },
  })

  const { data: pickData } = useQuery(FETCH_USED_ITEMS_PICKED, {
    variables: {
      // page: 1,
      search: "",
    },
  })

  // console.log(pickData)

  useEffect(() => {
    if (
      pickData?.fetchUseditemsIPicked.filter(
        (el) => el._id === itemData?.fetchUseditem._id
      ).length >
        0 ===
      true
    ) {
      setPick(true)
    } else {
      setPick(false)
    }
  }, [pickData])

  const onClickDelete = async () => {
    try {
      await deleteUseditem({
        variables: { useditemId: String(router.query.id) },
      })
      alert("????????? ?????????????????????.")
      router.push("/usedItems")
    } catch (error) {
      alert(error.message)
    }
  }

  // const onClickOnOff = () => {
  //   setPick((prev) => (!prev))
  // }

  const onClickToggleUsedItemPick = async () => {
    try {
      await toggleUseditemPick({
        variables: { useditemId: String(router.query.id) },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM,
            variables: { useditemId: String(router.query.id) },
          },
        ],
      })
      // console.log(result)
      if (pick === false) {
        alert("????????? ???????????????!")
        setPick(true)
      }
      if (pick === true) {
        alert("?????? ??????????????????!")
        setPick(false)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const onClickPayment = async () => {
    try {
      await createPointTransactionOfBuyingAndSelling({
        variables: { useritemId: String(router.query.id) },
      })
      alert("?????? ?????? ??????!")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <UsedItemDetailUI
        pick={pick}
        itemData={itemData}
        onClickDelete={onClickDelete}
        onClickToggleUsedItemPick={onClickToggleUsedItemPick}
      />
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        {itemData?.fetchUseditem?.soldAt ? (
          <BuyButton disabled>
            {getMyDate(itemData?.fetchUseditem?.soldAt)} <br /> ????????????!
          </BuyButton>
        ) : (
          <BuyButton onClick={onClickPayment}>
            {itemData?.fetchUseditem?.price} ??? <br /> ????????????
          </BuyButton>
        )}
      </div>
    </>
  )
}
