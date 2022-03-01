import UploadButtons from "../../../commons/imageUpload"
import * as S from "./usedItemWrite.styles"
import Input01 from "../../../commons/inputs/01/inputs01"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import { useEffect, useState } from "react"
import Input02 from "../../../commons/inputs/02/inputs02"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
declare const window: typeof globalThis & {
  kakao: any
}

export default function UsedItemWriteUI(props) {
  const [도로명, set도로명] = useState("")
  const [지번, set지번] = useState("")

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
          center: new window.kakao.maps.LatLng(37.4847794, 126.896405), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
        }

        const map = new window.kakao.maps.Map(mapContainer, mapOption) // 지도를 생성합니다

        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder()
        console.log(geocoder)
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude // 위도
            const lon = position.coords.longitude // 경도
            props.setLat(lat)
            props.setLng(lon)

            const locPosition = new window.kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            const message =
              '<div style="padding:5px; display:hidden">위치를 찍어주세요.</div>' // 인포윈도우에 표시될 내용입니다

            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message)
          })
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

          const locPosition = new window.kakao.maps.LatLng(
            37.4847794,
            126.896405
          )
          const message = "geolocation을 사용할수 없어요.."

          displayMarker(locPosition, message)
        }

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition, message) {
          // 마커를 생성합니다
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
          })

          const iwContent = message // 인포윈도우에 표시할 내용
          const iwRemoveable = true

          // 인포윈도우를 생성합니다
          const infowindow = new window.kakao.maps.InfoWindow({
            zindex: 1,
            content: iwContent,
            removable: iwRemoveable,
          })

          // 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker)

          // 지도 중심좌표를 접속위치로 변경합니다
          map.setCenter(locPosition)

          searchAddrFromCoords(map.getCenter(), displayCenterInfo)

          window.kakao.maps.event.addListener(
            map,
            "click",
            function (mouseEvent) {
              searchDetailAddrFromCoords(
                mouseEvent.latLng,
                function (result, status) {
                  if (status === window.kakao.maps.services.Status.OK) {
                    let detailAddr = !!result[0].road_address
                      ? "<div>도로명주소 : " +
                        result[0].road_address.address_name +
                        "</div>"
                      : ""
                    detailAddr +=
                      "<div>지번 주소 : " +
                      result[0].address.address_name +
                      "</div>"

                    const content =
                      '<div class="bAddr">' +
                      // '<span class="title">법정동 주소정보</span>' +
                      detailAddr +
                      "</div>"

                    // 마커를 클릭한 위치에 표시합니다
                    marker.setPosition(mouseEvent.latLng)
                    marker.setMap(map)
                    infowindow.close()

                    props.setLat(mouseEvent.latLng.Ma)
                    props.setLng(mouseEvent.latLng.La)

                    set도로명(result[0]?.road_address?.address_name)
                    set지번(result[0]?.address?.address_name)
                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                    // infowindow.setContent(content)
                    // infowindow.open(map, marker)
                  }
                }
              )
            }
          )

          window.kakao.maps.event.addListener(map, "idle", function () {
            searchAddrFromCoords(map.getCenter(), displayCenterInfo)
          })

          function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(
              coords.getLng(),
              coords.getLat(),
              callback
            )
          }

          function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
          }

          function displayCenterInfo(result, status) {
            // if (status === window.kakao.maps.services.Status.OK) {
            //   const infoDiv = document.getElementById("centerAddr")
            //   for (let i = 0; i < result.length; i++) {
            //     // 행정동의 region_type 값은 'H' 이므로
            //     if (result[i].region_type === "H") {
            //       infoDiv.innerHTML = result[i].address_name
            //       break
            //     }
            //   }
            // }
          }
        }

        // 좌표로 주소
        // const marker = new window.kakao.maps.Marker() // 클릭한 위치를 표시할 마커입니다
        // const infowindow = new window.kakao.maps.InfoWindow({ zindex: 1 }) // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
      })
    }
  }, [])

  props.setAddress(도로명 || 지번 || "")

  return (
    <S.Wrapper>
      <S.Form
        onSubmit={
          props.isEdit
            ? props.handleSubmit(props.onClickUpdate)
            : props.handleSubmit(props.onClickSubmit)
        }
      >
        <S.WrapperHead>
          <S.CancelButton type="button" onClick={props.onClickMovetoUseditem}>
            취소
          </S.CancelButton>
          <S.WrapperTitle>
            {props.isEdit ? "상품 수정" : "상품 등록"}
          </S.WrapperTitle>
          <S.SubmitButton isEdit={props.isEdit} isActive={props.isActive}>
            {props.isEdit ? "수정" : "등록"}
          </S.SubmitButton>
        </S.WrapperHead>
        <S.WrapperBody>
          <S.WrapperBodyHead>
            <S.ItemName>
              <Input01
                type="text"
                placeholder="도서명을 입력해주세요"
                register={props.register("name")}
                //   onChange={props.onChangeWriter}
                defaultValue={props.data?.fetchUseditem.name}
              ></Input01>
              <div style={{ color: "red", fontSize: "14px" }}>
                {props.formState.errors.name?.message}
              </div>
            </S.ItemName>
            <S.ItemPrice>
              <Input01
                type="number"
                placeholder="판매 가격을 입력해주세요."
                register={props.register("price")}
                defaultValue={props.data?.fetchUseditem.price}
              ></Input01>
              <div style={{ color: "red", fontSize: "14px" }}>
                {props.formState.errors.price?.message}
              </div>
            </S.ItemPrice>
          </S.WrapperBodyHead>
          <S.WrapperBodyBody>
            <Input01
              type="text"
              placeholder="한 줄 도서평을 입력해주세요"
              register={props.register("remarks")}
              defaultValue={props.data?.fetchUseditem.remarks}
            />
            <div style={{ color: "red" }}>
              {props.formState.errors.remarks?.message}
            </div>
            <S.Contents>
              <ReactQuill
                placeholder="도서를 설명해주세요"
                onChange={props.handleChange}
                style={{ height: "300px" }}
                defaultValue={
                  props.contents || props.data?.fetchUseditem.contents || ""
                }
                // defaultValue={props.data?.fetchUseditem.contents}
              />
            </S.Contents>
            <div style={{ display: "flex" }}>
              {props.tags.map((el, index) => (
                <div
                  key={index}
                  style={{
                    color: "white",
                    backgroundColor: "darkred",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "10px 5px",
                  }}
                >
                  {el}
                  <button
                    type="button"
                    onClick={props.onClickDeleteTag(el)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    x
                  </button>
                </div>
              ))}

              <div style={{ color: "red", fontSize: "14px" }}>
                {props.formState.errors.contents?.message}
              </div>
            </div>
          </S.WrapperBodyBody>
        </S.WrapperBody>
      </S.Form>

      <S.WrapperFoot>
        <Input02
          type="text"
          placeholder="태그를 입력해주세요(예시 : #태그)"
          onChangeTag={props.onChangeTag}
          onKeyUpTags={props.onKeyUpTags}
          defaultValue={props.data?.fetchUseditem.tag}
        />
        <S.Location>
          <S.LocationLeft>
            거래위치
            <div
              id="map"
              style={{
                maxWidth: "90%",
                minHeight: "90%",
              }}
            >
              {/* <div className="hAddr">
                  <span className="title">지도중심기준 행정동 주소정보</span>
                  <span id="centerAddr"></span>
                </div> */}
            </div>
          </S.LocationLeft>
          <S.LocationRight>
            <div>GPS</div>
            <div>
              <div>위도(LAT) : {props.lat}</div>
              <div>경도(LNG) : {props.lng}</div>
            </div>
            <div>주소</div>
            <Input01 placeholder={도로명 || 지번 || ""} readonly={true} />
          </S.LocationRight>
        </S.Location>
        <S.ImageUpload>
          <UploadButtons
            onChangeFile={props.onChangeFile}
            images={props.images}
          />
        </S.ImageUpload>
        <S.MainImage>
          <div>메인 사진 설정</div>
          <div>
            <label>
              <input type="radio" name="main" />
              <span> 사진 1</span>
            </label>
            <label>
              <input type="radio" name="main" />
              <span> 사진 2</span>
            </label>
          </div>
        </S.MainImage>
      </S.WrapperFoot>
    </S.Wrapper>
  )
}
