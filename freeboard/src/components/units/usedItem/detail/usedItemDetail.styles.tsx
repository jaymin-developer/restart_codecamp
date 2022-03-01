import styled from "@emotion/styled"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import LinkIcon from "@mui/icons-material/Link"
import ReactPlayer from "react-player"

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`

export const DetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
  border: 1px solid lightgray;
`

export const TopMenu = styled.div`
  font-size: 16px;
  color: darkred;
  :hover {
    cursor: pointer;
  }
`

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
  width: 65%;
`
export const Writer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const CreatedAt = styled.div`
  color: #828282;
`

export const Remark = styled.p`
  max-width: 1500px;
  table-layout: fixed;
  word-wrap: break-word;

  font-size: 14px;
  color: #bdbdbd;
`

export const Name = styled.p`
  padding-top: 20px;
  max-width: 1500px;
  table-layout: fixed;
  word-wrap: break-word;
  font-size: 24px;
`

export const Price = styled.p`
  max-width: 1500px;
  table-layout: fixed;
  word-wrap: break-word;
  font-size: 36px;
`

export const SliderBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  width: 80%;
  height: 500px;
`

export const Youtube = styled(ReactPlayer)`
  margin: auto;
`

export const Image = styled.img`
  margin: auto;
  height: 100%;
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
  max-width: 1500px;
  table-layout: fixed;
  word-wrap: break-word;
  padding-top: 50px;
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
export const SliderItem = styled.img`
  height: 350px;
  margin: auto;
`
