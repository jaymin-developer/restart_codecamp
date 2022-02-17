import * as S from "./usedItemDetail.styles"
import { getMyDate } from "../../../../commons/libraries/utils"
import BasicMenu from "../../../commons/basicMenu/index"
import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useMoveToPage } from "../../../commons/hooks/useMoveToPage"

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

export default function BoardDetailUI(props) {
  const router = useRouter()
  const { moveToPage, visitedPage } = useMoveToPage()
  console.log(visitedPage)

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

  console.log(data)

  //   function onClickMovetoEdit() {
  //     router.push(`/usedItems/${router.query.id}/edit`)
  //   }

  return (
    <S.Wrapper>
      <S.DetailWrapper>
        <S.TopMenu onClick={props.onClickMoveToList}> 중고마켓 </S.TopMenu>
        <S.WriterBox>
          <S.ProfilePhoto src="https://us.123rf.com/450wm/3t0n4k/3t0n4k1902/3t0n4k190200018/125360306-%EC%B1%85-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B8%B0%ED%98%B8-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%95%99%EC%8A%B5-%EA%B5%90%EC%9C%A1-%EC%84%9C%EC%A0%90-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6" />
          <S.WriterCreatedAt>
            <S.Writer>판매자</S.Writer>
            <S.CreatedAt>
              {getMyDate(data?.fetchUseditem?.createdAt)}
            </S.CreatedAt>
          </S.WriterCreatedAt>
          {/* <S.MapIcon /> */}
          <S.Link />
          <BasicMenu moveToPage={moveToPage} visitedPage={visitedPage} />
        </S.WriterBox>
        <S.Remark>{data?.fetchUseditem?.remarks}</S.Remark>
        <S.Name>{data?.fetchUseditem?.name}</S.Name>
        <S.Price>{data?.fetchUseditem?.price}</S.Price>
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
    </S.Wrapper>
  )
}
