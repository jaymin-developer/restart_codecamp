import * as S from "./usedItemDetail.styles"
import { getMyDate, TodayDate } from "../../../../commons/libraries/utils"
import BasicMenu from "../../../commons/basicMenu/index"
import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ItemList from "../../../commons/itemlist/itemlist"

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

  return (
    <S.Wrapper>
      <S.DetailWrapper>
        <S.TopMenu onClick={props.onClickMoveToList}> 중고마켓 </S.TopMenu>
        <S.WriterBox>
          <S.ProfilePhoto src="/images/defaultbook.png" />
          <S.WriterCreatedAt>
            <S.Writer>판매자</S.Writer>
            <S.CreatedAt>
              {getMyDate(data?.fetchUseditem?.createdAt)}
            </S.CreatedAt>
          </S.WriterCreatedAt>
          {/* <S.MapIcon /> */}
          <S.Link />
          <BasicMenu location={location} onClickDelete={props.onClickDelete} />
        </S.WriterBox>
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
        <S.Contents>{data?.fetchUseditem?.contents}</S.Contents>

        <div>tags :</div>
      </S.DetailWrapper>
      <ItemList />
    </S.Wrapper>
  )
}
