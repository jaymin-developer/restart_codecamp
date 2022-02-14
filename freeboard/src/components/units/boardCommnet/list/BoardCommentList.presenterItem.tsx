import styled from "@emotion/styled"
import { getMyDate } from "../../../../commons/libraries/utils"
import { Rating } from "@mui/material"

const Wrapper = styled.div`
  max-width: 960px;
  margin: 30px auto 30px auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 10px;
  border: 1px solid #bdbdbd;
  border-radius: 20px;
`

const WrapperStart = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileImg = styled.img`
  width: 50%;
  border-radius: 50%;
`

const WrapperMiddle = styled.div`
  width: 75%;
`

const MiddleTop = styled.div`
  width: 100%;
  font-size: 16px;
  padding: 10px 0;
  display: flex;
  justify-content: flex-start;
`

const WrapperLast = styled.div`
  width: 10%;
  padding: 10px 0;
`

export default function BoardCommentListItemUI(props) {
  return (
    <Wrapper>
      <WrapperStart>
        <ProfileImg src="https://us.123rf.com/450wm/3t0n4k/3t0n4k1902/3t0n4k190200018/125360306-%EC%B1%85-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B8%B0%ED%98%B8-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%95%99%EC%8A%B5-%EA%B5%90%EC%9C%A1-%EC%84%9C%EC%A0%90-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6" />
      </WrapperStart>
      <WrapperMiddle>
        <MiddleTop>
          <span>{props.el?.writer}</span>
          <Rating
            style={{ width: "30%", marginLeft: "10px" }}
            onChange={props.onChangeStar}
            defaultValue={props.el?.rating}
            readOnly={true}
          />
        </MiddleTop>
        <p>{props.el?.contents}</p>
        <p style={{ color: "#bdbdbd" }}>{getMyDate(props.el?.createdAt)}</p>
      </WrapperMiddle>
      <WrapperLast>
        <button>수정</button>
        <button>삭제</button>
      </WrapperLast>
    </Wrapper>
  )
}
