import * as S from "./BoardDetail.styles"
import { getMyDate } from "../../../../commons/libraries/utils"
import BasicMenu from "../../../commons/basicMenu/index"

export default function BoardDetailUI(props) {
  console.log(props.data?.fetchBoard)
  return (
    <S.Wrapper>
      <S.DetailWrapper>
        <S.Head>
          <S.TopMenu onClick={props.onClickMoveToList}> 자유게시판 </S.TopMenu>
          <S.WriterBox>
            <S.ProfilePhoto src="https://us.123rf.com/450wm/3t0n4k/3t0n4k1902/3t0n4k190200018/125360306-%EC%B1%85-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B8%B0%ED%98%B8-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%95%99%EC%8A%B5-%EA%B5%90%EC%9C%A1-%EC%84%9C%EC%A0%90-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6" />
            <S.WriterCreatedAt>
              <S.Writer>{props.data?.fetchBoard?.writer}</S.Writer>
              <S.CreatedAt>
                {getMyDate(props.data?.fetchBoard?.createdAt)}
              </S.CreatedAt>
            </S.WriterCreatedAt>
            <S.MapIcon />
            <S.Link />
            <BasicMenu />
          </S.WriterBox>
          <S.Title>{props.data?.fetchBoard?.title}</S.Title>
          <S.Image
            src={`https://storage.googleapis.com/${props.data?.fetchBoard?.images?.[0]}`}
          />
          <S.Contents>{props.data?.fetchBoard?.contents}</S.Contents>
          <S.LikeDisLikeBox>
            {props.likeClicked ? (
              <S.LikeDisLike>
                <S.LikeFilledIcon onClick={props.isLikeClicked} />
                {props.data?.fetchBoard.likeCount}
              </S.LikeDisLike>
            ) : (
              <S.LikeDisLike onClick={props.isLikeClicked}>
                <S.LikeIcon />
                {props.data?.fetchBoard.likeCount}
              </S.LikeDisLike>
            )}
            {props.disLikeClicked ? (
              <S.LikeDisLike onClick={props.isDisLikeClicked}>
                <S.DislikeFilledIcon />
                {props.data?.fetchBoard.dislikeCount}
              </S.LikeDisLike>
            ) : (
              <S.LikeDisLike onClick={props.isDisLikeClicked}>
                <S.DisLikeIcon />
                {props.data?.fetchBoard.dislikeCount}
              </S.LikeDisLike>
            )}
          </S.LikeDisLikeBox>
        </S.Head>
      </S.DetailWrapper>
    </S.Wrapper>
  )
}
