import styled from "@emotion/styled"
import { Rating } from "@mui/material"

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 80px;
`

const WrapperHead = styled.div`
  width: 100%;
  padding: 0px 0px 20px;
`
const WrapperHeadInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const HeadInput = styled.input`
  width: 30%;
  height: 50px;
  padding: 20px;
  margin-right: 10px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
`

const WrapperBody = styled.div`
  display: flex;
  flex-direction: column;
`

const BodyInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 20px;
  border: 1px solid #bdbdbd;
  resize: none;
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
`

const BodyBottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  border: 1px solid #bdbdbd;
  border-radius: 0 0 10px 10px;

  & p {
    color: #bdbdbd;
    padding-left: 10px;
    line-height: 40px;
  }
  & button {
    background-color: darkred;
    color: white;
    border: none;
    border-radius: 0 0 10px 0;
    :hover {
      cursor: pointer;
    }
  }
`

export default function BoardCommentWriteUI(props) {
  return (
    <>
      <Wrapper>
        <WrapperHead>
          <h2>📮댓글</h2>
          <WrapperHeadInput>
            <HeadInput
              type="text"
              placeholder="작성자"
              onChange={props.onChangeWriter}
            />
            <HeadInput
              type="password"
              placeholder="비밀번호"
              onChange={props.onChangePassword}
            />
            <Rating style={{ width: "30%" }} onChange={props.onChangeStar} />
          </WrapperHeadInput>
        </WrapperHead>
        <WrapperBody>
          <BodyInput
            maxLength={100}
            onChange={props.onChangeContents}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <BodyBottom>
            <p>{props.contents.length}/100</p>
            <button onClick={props.onClickWrite}>등록하기</button>
          </BodyBottom>
        </WrapperBody>
      </Wrapper>
    </>
  )
}
