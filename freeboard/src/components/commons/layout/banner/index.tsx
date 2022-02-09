import styled from "@emotion/styled"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Wrapper = styled.div`
  height: 340px;
  width: 100%;
  padding-left: 80px;
  padding-top: 20px;
  background-color: #b1515147;
  /* display: flex; */
  overflow: hidden;
`

const ImgDiv = styled.div`
  height: 300px;
  & img {
    height: 300px;
    width: 200px;
  }
`

export default function LayoutBanner() {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: true,
  }

  return (
    <Wrapper>
      <Slider {...settings}>
        <ImgDiv>
          <img src="http://image.yes24.com/goods/106190862/XL" />
        </ImgDiv>
        <ImgDiv>
          <img src="http://image.yes24.com/goods/106190826/XL" />
        </ImgDiv>
        <ImgDiv>
          <img src="http://image.yes24.com/goods/99308021/XL" />
        </ImgDiv>
        <ImgDiv>
          <img src="http://image.yes24.com/goods/105363239/XL" />
        </ImgDiv>
        <ImgDiv>
          <img src="http://image.yes24.com/goods/106227315/XL" />
        </ImgDiv>
        <ImgDiv>
          <img src="http://image.yes24.com/goods/106404215/XL" />
        </ImgDiv>
        <ImgDiv>
          <img src="http://image.yes24.com/goods/106479154/XL" />
        </ImgDiv>
        <ImgDiv>
          <img src="http://image.yes24.com/goods/105106894/XL" />
        </ImgDiv>
        <ImgDiv>
          <img src="http://image.yes24.com/goods/105981214/XL" />
        </ImgDiv>
        <ImgDiv>
          <img src="http://image.yes24.com/goods/96547408/XL" />
        </ImgDiv>
      </Slider>
    </Wrapper>
  )
}
