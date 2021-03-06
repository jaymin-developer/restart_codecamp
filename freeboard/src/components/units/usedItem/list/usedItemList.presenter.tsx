import * as S from "./usedItemList.styles"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
// import CardMedia from "@mui/material/CardMedia"
// import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import {
  getMyDate,
  NowDate,
  TodayDate,
} from "../../../../commons/libraries/utils"
import { gql, useQuery } from "@apollo/client"
import InfiniteScroll from "react-infinite-scroller"
import { useRouter } from "next/router"
import _ from "lodash"
import { ChangeEvent, useState } from "react"
import styled from "@emotion/styled"
// import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

const Word = styled.span`
  color: ${(props) => (props.isMatched ? "red" : "black")};
`

const FETCH_USED_ITEMS = gql`
  query fetchUseditems($isSoldout: Boolean, $search: String, $page: Int) {
    fetchUseditems(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        address
      }
      seller {
        name
      }
      createdAt
    }
  }
`

// interface Iprops {
//   isMatched: boolean
// }

// const CardActionsDiv = styled(CardActions)`
//   display: flex;
//   justify-content: flex-end;
// `

// const Word = styled.span`
//   color: ${(props: Iprops) => (props.isMatched ? "red" : "black")};
// `

export default function UsedItemListUI() {
  const router = useRouter()
  const [keyword, setKeyWord] = useState("")

  const { data, refetch, fetchMore } = useQuery(FETCH_USED_ITEMS, {
    variables: { page: 1 },
  })

  const getDebounce = _.debounce((data) => {
    refetch({ search: data, page: 1 })
    setKeyWord(data)
  }, 500)

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value)
  }

  const onLoadMore = () => {
    if (!data) return

    fetchMore({
      variables: { page: Math.ceil(data.fetchUseditems.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditems)
          return { fetchUseditems: [...prev.fetchUseditems] }

        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        }
      },
    })
  }

  const onClickMoveToUsedItemDetail = (el) => (event) => {
    const basket = JSON.parse(localStorage.getItem(`${TodayDate()}`) || "[]")
    // if (localStorage.key(localStorage.indexOf(basket)) === TodayDate())
    // ???????????? ??????

    if (JSON.stringify(localStorage).includes(el._id) === false) {
      basket.push(el)
    }
    localStorage.setItem(`${TodayDate()}`, JSON.stringify(basket))
    router.push(`/usedItems/${event.currentTarget.id}`)
  }

  function onClickMoveToUsedItemNew() {
    router.push("/usedItems/new")
  }

  return (
    <S.Wrapper>
      <S.Head>????????????? ??????</S.Head>
      <S.BestBoards>
        {/* {props.bestListData?.fetchBoardsOfTheBest.map((el, index) => (
          <Card
            key={el._id}
            sx={{ minWidth: "20%", width: "23%", margin: 0.5 }}
          >
            {el.images[0] ? (
              <CardMedia
                component="img"
                height="140"
                image={`https://storage.googleapis.com/${el.images[0]}`}
                alt="book"
              />
            ) : (
              <CardMedia
                component="img"
                height="140"
                image="https://us.123rf.com/450wm/3t0n4k/3t0n4k1902/3t0n4k190200018/125360306-%EC%B1%85-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B8%B0%ED%98%B8-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%95%99%EC%8A%B5-%EA%B5%90%EC%9C%A1-%EC%84%9C%EC%A0%90-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6"
                alt="book"
              />
            )}
            <CardContent>
              {getMyDate(el.createdAt).slice(0, 10)} {el.writer}
              <Typography id={el._id} gutterBottom variant="h5" component="div">
                {el.title}
              </Typography>
              <Typography id={el._id} variant="body2" color="text.secondary">
                {el.contents}
              </Typography>
            </CardContent>
            <CardActionsDiv>
              <Button size="small">??????</Button>
              <Button
                id={el._id}
                size="small"
                onClick={props.onClickMoveToBoardDetail}
              >
                ??? ??????
              </Button>
            </CardActionsDiv>
          </Card>
        ))} */}
      </S.BestBoards>
      <S.BodyInfo>
        <S.SearchTitle
          type="text"
          placeholder="????????? ??????????????????."
          onChange={onChangeSearch}
        />
        <S.SearchDate> YYYY.MM.DD ~ YYYY.MM.DD </S.SearchDate>
        <S.SearchButton>????????????</S.SearchButton>
        <S.WriteButton onClick={onClickMoveToUsedItemNew}>
          ????????????
        </S.WriteButton>
      </S.BodyInfo>
      <S.ContentsList>
        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
          {data?.fetchUseditems.map((el, index) => (
            <Box
              key={el._id}
              id={el._id}
              onClick={onClickMoveToUsedItemDetail(el)}
              sx={{ minWidth: 275, marginBottom: 2 }}
            >
              <Card
                variant="outlined"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  cursor: "pointer",
                  width: "100%",
                }}
                //   onClick={props.onClickMoveToBoardDetail}
              >
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                  }}
                  src={`https://storage.googleapis.com/${el.images[0]}`}
                  onError={(e) => {
                    e.currentTarget.src = "/images/defaultbook.png"
                  }}
                />
                <CardContent style={{ width: "40%" }}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {/* {getMyDate(el.createdAt)} */}
                    {Number(NowDate().slice(0, 10).split(".").join("")) ===
                    Number(
                      getMyDate(el.createdAt).slice(0, 10).split(".").join("")
                    ) ? (
                      <span style={{ fontSize: "20px" }}>???? </span>
                    ) : (
                      <span></span>
                    )}
                    ???????????? : {getMyDate(el.createdAt)} ?????? {el.pickedCount}
                  </Typography>
                  <Typography
                    id={el._id}
                    variant="h5"
                    component="div"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    maxWidth="700px"
                  >
                    ????????? :
                    {el.name
                      .replaceAll(keyword, `#$%${keyword}#$%`)
                      .split("#$%")
                      .map((el) => (
                        <span key={uuidv4()}>
                          <Word isMatched={el === keyword}>{el}</Word>
                        </span>
                      ))}
                  </Typography>

                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    maxWidth="700px"
                  >
                    ????????? : {el.remarks}
                  </Typography>
                  <Typography
                    variant="body2"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    maxWidth="700px"
                  >
                    ????????? : {el.seller.name}
                  </Typography>
                </CardContent>
                <CardContent style={{ width: "40%" }}>
                  {" "}
                  <Typography
                    variant="body2"
                    maxWidth="700px"
                    display="flex"
                    alignItems="center"
                    height="70%"
                    fontSize="20px"
                  >
                    ?????? : {el.price}???<br /> ???????????? :
                    {el.useditemAddress?.address
                      ? el.useditemAddress?.address
                      : "?????? ?????? ??????"}{" "}
                    <br />
                  </Typography>
                  <div style={{ display: "flex" }}>
                    {el.tags?.map((el, index) => (
                      <div
                        key={index}
                        style={{
                          color: "white",
                          backgroundColor: "darkred",
                          padding: "10px",
                          borderRadius: "10px",
                          margin: "0px 5px",
                          fontSize: "5px",
                        }}
                      >
                        {el}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Box>
          ))}
        </InfiniteScroll>
      </S.ContentsList>
    </S.Wrapper>
  )
}
