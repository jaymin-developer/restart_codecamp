import { gql, useMutation, useQuery } from "@apollo/client"
import { Modal } from "antd"
import Head from "next/head"
import { useState } from "react"
import { IQuery } from "../../../commons/types/generated/types"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import MyUsedItemsPage from "./myuseditems"
import _ from "lodash"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const WrapperLeft = styled.div`
  width: 20%;
  margin-top: 100px;
  padding: 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const WrapperRight = styled.div`
  width: 80%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`

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

export default function MyPageList() {
  const router = useRouter()
  const [keyword, setKeyWord] = useState("")
  const [pickUsedItem, setPickUsedItem] = useState(true)
  const [pickMyPoint, setPickMyPoint] = useState(false)
  const [pickMyProfile, setMyProfile] = useState(false)
  const [amount, setAmount] = useState(0)
  const [isModal, setIsModal] = useState(false)
  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING,
    { variables: { impUid: "imp49910675" } }
  )

  const { data, refetch } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN)

  const { data: soldData, refetch: soldRefetch } = useQuery(
    FETCH_USED_ITEMS_I_SOLD
  )
  console.log(soldData?.fetchUseditemsISold)

  const onChangeAmount = (event) => {
    setAmount(Number(event.target.value))
  }

  const onClickModal = () => {
    setIsModal((prev) => !prev)
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
          console.log(rsp)
          // 결제 성공 시 로직,
          // 포인트 충전시 이 곳에서 BE로 정보를 넘겨주는 로직을 작성해야함 ( imp_uid , paid_amount ) 즉, Mutation 실행 (createPointTransactionOfLoading)
          // console.log("ㅁㄴㅇ", rsp);
          chargePoint(rsp)
          onClickModal()
          // router.push("/mypage")
        } else {
          alert("결제에 실패했습니다.")
          // 결제 실패 시 로직,
        }
      }
    )
  }

  const getDebounce = _.debounce((data) => {
    soldRefetch({ search: data, page: 1 })
    setKeyWord(data)
  }, 500)

  const onChangeSearch = (event) => {
    getDebounce(event.target.value)
  }

  function onClickMoveToBoardDetail(event) {
    router.push(`/usedItems/${event.target.id}`)
  }

  function onClickPickUsedItem() {
    setPickUsedItem(true)
    setPickMyPoint(false)
    setMyProfile(false)
  }

  function onClickPickMyPoint() {
    setPickUsedItem(false)
    setPickMyPoint(true)
    setMyProfile(false)
  }

  function onClickMyProfile() {
    setPickUsedItem(false)
    setPickMyPoint(false)
    setMyProfile(true)
  }

  return (
    <>
      {isModal && (
        <Modal
          visible={true}
          onOk={onClickPayment}
          onCancel={onClickModal}
          okText="충전하기"
          cancelText="취소하기"
          style={{ textAlign: "center", width: "100%" }}
        >
          <h1>📚 북스메모리 포인트 충전</h1>
          <select
            onChange={onChangeAmount}
            style={{ width: "80%", textAlign: "center", fontSize: "18px" }}
          >
            <option selected disabled>
              충전 금액을 선택해주세요.
            </option>
            <option value="500">500 포인트</option>
            <option value="1000">1000 포인트</option>
            <option value="2000">2000 포인트</option>
            <option value="3000">3000 포인트</option>
          </select>
        </Modal>
      )}
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
      <Wrapper>
        <WrapperLeft>
          <h1>MYPAGE</h1>
          <img
            src="/images/Profile.png"
            width="80%"
            style={{ cursor: "pointer" }}
          />
          <h2>{data?.fetchUserLoggedIn.name}</h2>
          <p style={{ color: "gray" }}>
            💲{data?.fetchUserLoggedIn.userPoint.amount}
          </p>
          <br />
          <p
            style={{
              cursor: "pointer",
              color: pickUsedItem ? "darkred" : "black",
            }}
            onClick={onClickPickUsedItem}
          >
            🛄 내 장터
          </p>
          <p
            style={{
              cursor: "pointer",
              color: pickMyPoint ? "darkred" : "black",
            }}
            onClick={onClickPickMyPoint}
          >
            💲 내 포인트
          </p>
          <p
            style={{
              cursor: "pointer",
              color: pickMyProfile ? "darkred" : "black",
            }}
            onClick={onClickMyProfile}
          >
            ☺︎ 내 프로필
          </p>
          <p onClick={onClickModal} style={{ cursor: "pointer" }}>
            𝐏 포인트 충전
          </p>
        </WrapperLeft>
        <WrapperRight>
          {pickUsedItem && (
            <MyUsedItemsPage
              soldData={soldData}
              onClickMoveToBoardDetail={onClickMoveToBoardDetail}
              keyword={keyword}
              onChangeSearch={onChangeSearch}
            />
          )}
          {pickMyPoint && <div>포인트</div>}

          {pickMyProfile && <div>프로필</div>}
        </WrapperRight>
      </Wrapper>
    </>
  )
}
