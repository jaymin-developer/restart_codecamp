import styled from "@emotion/styled"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useEffect, useState } from "react"
import { TodayDate } from "../../../commons/libraries/utils"
import { useRouter } from "next/router"

const Wrapper = styled.div`
  min-height: 300px;
  width: 100%;
  padding: 10px;
  background-color: #b1515147;
  overflow: hidden;
`

const ImgDiv = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  /* margin-left: 30px; */
  /* aspect-ratio: 1/1; */
  /* cursor: "pointer"; */
  /* margin-bottom: 5000px; */
  /* & img {
    width: 100%; */
`

export default function ItemList() {
  const [list, setList] = useState([])
  const router = useRouter()
  useEffect(() => {
    setList(JSON.parse(localStorage.getItem(`${TodayDate()}`) || "[]"))
  }, [])

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  }

  const onClickDetail = (el) => () => {
    router.push(`/usedItems/${el._id}`)
  }

  return (
    <Wrapper>
      <p> 오늘 본 상품</p>
      <Slider {...settings}>
        {list.map((el, index) => (
          <ImgDiv key={el._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "100%",
                aspectRatio: "1/1",
                padding: "20px",
                // backgroundColor: "black",
                cursor: "pointer",
              }}
              onClick={onClickDetail(el)}
            >
              <img
                src={`https://storage.googleapis.com/${el.images[0]}`}
                style={{ width: "100%", height: "100%" }}
                onError={(e) => {
                  e.currentTarget.src = "/images/defaultbook.png"
                }}
              />
            </div>
            <div style={{ textAlign: "center" }}>{el.name}</div>
          </ImgDiv>
        ))}
      </Slider>
    </Wrapper>
  )
}
