import * as S from "./BoardList.styles"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { getMyDate } from "../../../../commons/libraries/utils"
import styled from "@emotion/styled"

const CardActionsDiv = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`

export default function BoardListUI(props) {
  console.log(props.bestListData)
  return (
    <S.Wrapper>
      <S.Head>베스트 게시글</S.Head>
      <S.BestBoards>
        {props.bestListData?.fetchBoardsOfTheBest.map((el, index) => (
          <Card key={el._id} sx={{ minWidth: 245, maxWidth: 245, margin: 0.5 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://us.123rf.com/450wm/3t0n4k/3t0n4k1902/3t0n4k190200018/125360306-%EC%B1%85-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B8%B0%ED%98%B8-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%95%99%EC%8A%B5-%EA%B5%90%EC%9C%A1-%EC%84%9C%EC%A0%90-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6"
              alt="book"
            />
            <CardContent>
              {getMyDate(el.createdAt)} {el.writer}
              <Typography id={el._id} gutterBottom variant="h5" component="div">
                {el.title}
              </Typography>
              <Typography id={el._id} variant="body2" color="text.secondary">
                {el.contents}
              </Typography>
            </CardContent>
            <CardActionsDiv>
              {/* <Button size="small">공유</Button> */}
              <Button
                id={el._id}
                size="small"
                onClick={props.onClickMoveToBoardDetail}
              >
                더 보기
              </Button>
            </CardActionsDiv>
          </Card>
        ))}
      </S.BestBoards>
      <S.BodyInfo>
        <S.SearchTitle type="text" placeholder="제목을 검색헤주세요." />
        <S.SearchDate> YYYY.MM.DD ~ YYYY.MM.DD </S.SearchDate>
        <S.WriteButton onClick={props.onClickMoveToBoardNew}>
          작성하기
        </S.WriteButton>
        <S.SearchButton>검색하기</S.SearchButton>
      </S.BodyInfo>
      <S.ContentsList>
        {props.data?.fetchBoards.map((el, index) => (
          <Box key={el._id} sx={{ minWidth: 275, marginBottom: 2 }}>
            <Card
              id={el._id}
              // onClick={props.onClickMoveToBoardDetail}
              variant="outlined"
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  작성일자 : {getMyDate(el.createdAt)}
                </Typography>
                <Typography id={el._id} variant="h5" component="div">
                  제목 : {el.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  작성자 : {el.writer}
                </Typography>
                <Typography variant="body2">내용 : {el.contents}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  id={el._id}
                  size="small"
                  onClick={props.onClickMoveToBoardDetail}
                >
                  더 보기
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </S.ContentsList>
    </S.Wrapper>
  )
}
