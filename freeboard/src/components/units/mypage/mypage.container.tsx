import { gql, useMutation, useQuery } from "@apollo/client"
import { Modal } from "antd"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { IQuery } from "../../../commons/types/generated/types"

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      impUid
      amount
    }
  }
`

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      userPoint {
        _id
        amount
      }
    }
  }
`

export default function MyPageList() {
  const [amount, setAmount] = useState(0)
  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING,
    { variables: { impUid: "imp49910675" } }
  )

  const { data, refetch } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN)

  console.log(data)
  const onChangeAmount = (event) => {
    setAmount(Number(event.target.value))
  }

  const chargePoint = async (rsp) => {
    try {
      await createPointTransactionOfLoading({
        variables: {
          impUid: rsp.imp_uid,
        },
      })
      refetch()
      Modal.success({ content: `포인트 충전이 완료되었습니다.` })
    } catch (error) {
      Modal.error({ content: `${error.message}` })
    }
  }

  const onClickPayment = () => {
    const IMP = window.IMP
    IMP.init("imp49910675")
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        name: "포인트 충전",
        amount,
        buyer_email: data?.fetchUserLoggedIn?.email,
        buyer_name: data?.fetchUserLoggedIn?.name,
        // m_redirect_url: ,  << 모바일 웹에서 결제 후 돌아갈 주소
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          // 포인트 충전시 이 곳에서 BE로 정보를 넘겨주는 로직을 작성해야함 ( imp_uid , paid_amount ) 즉, Mutation 실행 (createPointTransactionOfLoading)
          // console.log("ㅁㄴㅇ", rsp);
          chargePoint(rsp)
          // router.push("/mypage")
        } else {
          console.log("fail")
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
      <div>
        이름 {data?.fetchUserLoggedIn.name} 포인트
        {data?.fetchUserLoggedIn.userPoint.amount}
      </div>
      <input
        type="radio"
        id="100원"
        value="100"
        name="money"
        onChange={onChangeAmount}
      />
      100원
      <br />
      <input
        type="radio"
        id="1000원"
        value="1000"
        name="money"
        onChange={onChangeAmount}
      />
      1000원
      <br />
      <input
        type="radio"
        id="2000원"
        value="2000"
        name="money"
        onChange={onChangeAmount}
      />
      2000원
      <br />
      <input
        type="radio"
        id="5000원"
        value="5000"
        name="money"
        onChange={onChangeAmount}
      />
      5000원
      <br />
      <button onClick={onClickPayment}>충전금액</button>
    </>
  )
}
