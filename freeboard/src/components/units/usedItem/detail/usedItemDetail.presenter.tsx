import * as S from "./usedItemDetail.styles"
import { getMyDate } from "../../../../commons/libraries/utils"
import BasicMenu from "../../../commons/basicMenu/index"
import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ItemList from "../../../commons/itemlist/itemlist"
import Dompurify from "dompurify"
import { FcLikePlaceholder, FcLike } from "react-icons/fc"
import { useEffect } from "react"

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
      useditemAddress {
        address
        lat
        lng
      }
      seller {
        name
      }
    }
  }
`

declare const window: typeof globalThis & {
  kakao: any
}

export default function UsedItemDetailUI(props) {
  const location = "usedItems"
  const router = useRouter()
  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.id) },
  })

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  useEffect(() => {
    // 여기서 직접 다운로드 받고, 다 받을때까지 기다렸다가 그려주기!!
    const script = document.createElement("script") // <script></script> 태그를 만들어줌
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_API}&libraries=services&autoload=false`
    document.head.appendChild(script) // html 문서에 head부분에 자식태그로 script를 넣어줘
    // 이해했고

    script.onload = () => {
      window.kakao.maps.load(function () {
        const mapContainer = document.getElementById("map") // 지도를 표시할 div
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        }

        const map = new window.kakao.maps.Map(mapContainer, mapOption) // 지도를 생성합니다

        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667
        )

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map)
      })
    }
  })

  return (
    <S.Wrapper>
      <S.DetailWrapper>
        <S.TopMenu onClick={props.onClickMoveToList}> 중고마켓 </S.TopMenu>
        <S.WriterBox>
          <S.ProfilePhoto src="/images/defaultbook.png" />
          <S.WriterCreatedAt>
            <S.Writer>판매자 {data?.fetchUseditem?.seller.name}</S.Writer>
            <S.CreatedAt>
              {getMyDate(data?.fetchUseditem?.createdAt)}
            </S.CreatedAt>
          </S.WriterCreatedAt>
          {props.pick === 0 ? (
            <div style={{ alignItems: "center", fontSize: "16px" }}>
              <FcLikePlaceholder
                style={{
                  cursor: "pointer",
                  marginRight: "5px",
                }}
                onClick={props.onClickToggleUsedItemPick}
              />
              <span>{data?.fetchUseditem?.pickedCount}명</span>
            </div>
          ) : (
            <div style={{ alignItems: "center", fontSize: "16px" }}>
              <FcLike
                style={{
                  cursor: "pointer",
                  marginRight: "5px",
                }}
                onClick={props.onClickToggleUsedItemPick}
              />
              {data?.fetchUseditem?.pickedCount}명
            </div>
          )}
          <S.MapIcon />
          <S.Link />
          <BasicMenu location={location} onClickDelete={props.onClickDelete} />
        </S.WriterBox>
        <div>tags :</div>
        <S.Remark>{data?.fetchUseditem?.remarks}</S.Remark>
        <S.Name>{data?.fetchUseditem?.name}</S.Name>
        {/* <S.Price>{data?.fetchUseditem?.price}</S.Price> */}
        <Slider {...settings}>
          {data?.fetchUseditem.youtubeUrl && (
            <S.SliderBox>
              <S.Youtube
                url={props.data?.fetchUseditem.youtubeUrl}
                width="80%"
                height="100%"
              />
            </S.SliderBox>
          )}
          {data?.fetchUseditem?.images.map(
            (el, index) =>
              data?.fetchUseditem?.images[index] && (
                <S.SliderBox key={index}>
                  <S.Image
                    src={`https://storage.googleapis.com/${data?.fetchUseditem?.images?.[index]}`}
                  />
                </S.SliderBox>
              )
          )}
        </Slider>
        {process.browser ? (
          <S.Contents
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(String(data?.fetchUseditem.contents)),
            }}
          ></S.Contents>
        ) : (
          <S.Contents></S.Contents>
        )}
        {/* {data?.fetchUseditem.useditemAddress.lat && ( */}
        <div id="map" style={{ width: "100%", height: "350px" }}></div>
        {/* )} */}

        <div>거래위치 : {data?.fetchUseditem.useditemAddress?.address}</div>
      </S.DetailWrapper>
      <ItemList />
    </S.Wrapper>
  )
}
