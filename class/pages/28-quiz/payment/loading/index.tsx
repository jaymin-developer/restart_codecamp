import { gql, useMutation } from "@apollo/client"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      impUid
    }
  }
`

export default function PaymentPage() {
  const [amount, setAmount] = useState(0)
  const router = useRouter()
  console.log(amount)
  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  )

  const onChangeAmount = (event) => {
    setAmount(Number(event.target.value))
  }

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
        name: "노르웨이 회전 의자",
        amount: amount,
        buyer_email: "gildong@gmail.com",
        buyer_name: "김재민",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        // m_redirect_url : 모바일 결제시 돌아갈 주소!!
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          try {
            createPointTransactionOfLoading({
              variables: { impUid: "imp49910675" },
            })
          } catch (error) {
            alert(error.message)
          }
          alert("결제 완료!")
          router.push("/28-quiz/payment/complete")
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
      <input
        type="radio"
        id="500원"
        value="500"
        name="money"
        onChange={onChangeAmount}
      />
      500원
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

// apply_num: "14848528"
// bank_name: null
// buyer_addr: "서울특별시 강남구 신사동"
// buyer_email: "gildong@gmail.com"
// buyer_name: "홍길동"
// buyer_postcode: "01181"
// buyer_tel: "010-4242-4242"
// card_name: "신한카드"
// card_number: "517134****"
// card_quota: 0
// currency: "KRW"
// custom_data: null
// imp_uid: "imp_652828569658"
// merchant_uid: "nobody_1645497828530"
// name: "노르웨이 회전 의자"
// paid_amount: 100
// paid_at: 1645497932
// pay_method: "card"
// pg_provider: "nice"
// pg_tid: "nictest00m01012202221145306487"
// pg_type: "payment"
// receipt_url: "https://npg.nicepay.co.kr/issue/IssueLoader.do?TID=nictest00m01012202221145306487&type=0&InnerWin=Y"
// status: "paid"
// success: true
