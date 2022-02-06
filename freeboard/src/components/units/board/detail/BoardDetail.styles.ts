import styled from "@emotion/styled"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import LinkIcon from "@mui/icons-material/Link"

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 80px;
`

export const DetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
  border: 1px solid lightgray;
`

export const Head = styled.div``

export const WriterBox = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ProfilePhoto = styled.img`
  height: 50px;
  border-radius: 25px;
`

export const WriterCreatedAt = styled.div`
  width: 80%;
`
export const Writer = styled.div``
export const CreatedAt = styled.div`
  color: #828282;
`

export const Title = styled.h1`
  padding-top: 20px;
`

export const MapIcon = styled(MyLocationIcon)`
  font-size: 20px;
  color: darkred;
`

export const Link = styled(LinkIcon)`
  font-size: 20px;
  color: darkred;
`
export const Contents = styled.div`
  padding-top: 20px;
`

export const LikeDisLikeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`

export const LikeDisLike = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const LikeIcon = styled(ThumbUpOutlinedIcon)`
  color: red;
  font-size: 30px;
  :hover {
    cursor: pointer;
  }
`

export const LikeFilledIcon = styled(ThumbUpIcon)`
  color: red;
  font-size: 30px;
  :hover {
    cursor: pointer;
  }
`

export const DisLikeIcon = styled(ThumbDownOffAltIcon)`
  color: blue;
  font-size: 30px;
  :hover {
    cursor: pointer;
  }
`

export const DislikeFilledIcon = styled(ThumbDownAltIcon)`
  color: blue;
  font-size: 30px;
  :hover {
    cursor: pointer;
  }
`
