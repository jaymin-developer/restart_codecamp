import { gql, useMutation, useQuery } from "@apollo/client"
import { Modal } from "antd"
import Head from "next/head"
import { useState } from "react"
import { IQuery } from "../../../commons/types/generated/types"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import MyUsedItemsPage from "./myuseditems"
import MyProfilePage from "./myprofile"
import MyPointPage from "./mypoint"

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

export default function MyPageList() {
  const router = useRouter()
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
      Modal.success({ content: `????????? ????????? ?????????????????????.` })
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
        name: "????????? ??????",
        amount,
        buyer_email: data?.fetchUserLoggedIn?.email,
        buyer_name: data?.fetchUserLoggedIn?.name,
        // m_redirect_url: ,  << ????????? ????????? ?????? ??? ????????? ??????
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          console.log(rsp)
          // ?????? ?????? ??? ??????,
          // ????????? ????????? ??? ????????? BE??? ????????? ???????????? ????????? ??????????????? ( imp_uid , paid_amount ) ???, Mutation ?????? (createPointTransactionOfLoading)
          // console.log("?????????", rsp);
          chargePoint(rsp)
          onClickModal()
          // router.push("/mypage")
        } else {
          alert("????????? ??????????????????.")
          // ?????? ?????? ??? ??????,
        }
      }
    )
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
          okText="????????????"
          cancelText="????????????"
          style={{ textAlign: "center", width: "100%" }}
        >
          <h1>???? ??????????????? ????????? ??????</h1>
          <select
            onChange={onChangeAmount}
            style={{ width: "80%", textAlign: "center", fontSize: "18px" }}
          >
            <option selected disabled>
              ?????? ????????? ??????????????????.
            </option>
            <option value="500">500 ?????????</option>
            <option value="1000">1000 ?????????</option>
            <option value="2000">2000 ?????????</option>
            <option value="3000">3000 ?????????</option>
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
            ????{data?.fetchUserLoggedIn.userPoint.amount}
          </p>
          <br />
          <p
            style={{
              cursor: "pointer",
              color: pickUsedItem ? "darkred" : "black",
            }}
            onClick={onClickPickUsedItem}
          >
            ???? ??? ??????
          </p>
          <p
            style={{
              cursor: "pointer",
              color: pickMyPoint ? "darkred" : "black",
            }}
            onClick={onClickPickMyPoint}
          >
            ???? ??? ?????????
          </p>
          <p
            style={{
              cursor: "pointer",
              color: pickMyProfile ? "darkred" : "black",
            }}
            onClick={onClickMyProfile}
          >
            ?????? ??? ?????????
          </p>
          <p onClick={onClickModal} style={{ cursor: "pointer" }}>
            ???? ????????? ??????
          </p>
        </WrapperLeft>
        <WrapperRight>
          {pickUsedItem && (
            <MyUsedItemsPage
              onClickMoveToBoardDetail={onClickMoveToBoardDetail}
            />
          )}
          {pickMyPoint && <MyPointPage />}

          {pickMyProfile && <MyProfilePage />}
        </WrapperRight>
      </Wrapper>
    </>
  )
}
