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

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`

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
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId)
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
  const [pick, setPick] = useState(0)

  const [deleteUseditem] = useMutation(DELETE_USED_ITEM)
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK)
  const [createPointTransactionsOfLoading] = useMutation(
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

  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN)

  useEffect(() => {
    console.log(`첫번째 ${pick}`)
    if (
      pickData?.fetchUseditemsIPicked.filter(
        (el) => el._id === itemData?.fetchUseditem._id
      ).length >
        0 ===
      true
    ) {
      setPick(1)
      console.log(`두번째 ${pick}`)
    }
  }, [pickData])

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

  // const onClickOnOff = () => {
  //   setPick((prev) => (!prev))
  // }

  const onClickToggleUsedItemPick = async () => {
    try {
      const result = await toggleUseditemPick({
        variables: { useditemId: String(router.query.id) },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM,
            variables: { useditemId: String(router.query.id) },
          },
        ],
      })

      if (result.data.toggleUseditemPick === 1) {
        alert("상품을 찜했습니다!")
        setPick(result.data.toggleUseditemPick)
      }
      if (result.data.toggleUseditemPick === 0) {
        alert("찜을 취소했습니다!")
        setPick(result.data.toggleUseditemPick)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  console.log(itemData?.fetchUseditem?._id)
  console.log(pickData?.fetchUseditemsIPicked)

  const onClickPayment = () => {
    const IMP = window.IMP // 생략 가능
    IMP.init("imp49910675") // Example: imp00000000

    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011",
        name: itemData?.fetchUseditem?.name,
        amount: itemData?.fetchUseditem?.price,
        buyer_email: userData?.fetchUserLoggedIn.email,
        buyer_name: userData?.fetchUserLoggedIn.name,
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        // m_redirect_url : 모바일 결제시 돌아갈 주소!!
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          createPointTransactionsOfLoading({
            variables: { useritemId: String(router.query.id) },
          })
          alert("결제 완료!")
          router.push("/")
          // 백엔드에 결제관련 데이터 넘겨주기
          // => 즉, 뮤테이션 실행하기!!
          // ex, createPointTransactionsOfLoading
        } else {
          // 결제 실패 시 로직,
        }
      }
    )
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
        <BuyButton onClick={onClickPayment}>
          {itemData?.fetchUseditem?.price} 원 <br /> 구매하기
        </BuyButton>
      </div>
    </>
  )
}
