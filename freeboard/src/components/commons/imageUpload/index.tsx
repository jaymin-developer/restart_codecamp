// import * as React from "react"
// import { styled } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import Stack from "@mui/material/Stack"
import styled from "@emotion/styled"
// import { checkFileValidation } from "../../../commons/libraries/util"

const Input = styled.input`
  display: none;
`

const Image = styled.img``

export default function UploadButtons(props) {
  const onClickBig = () => {
    window.open(`https://storage.googleapis.com/${props.images}`)
  }

  return (
    <Stack
      display="flex"
      flexDirection="column"
      direction="row"
      //   alignItems="center"
      spacing={1}
    >
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={props.onChangeFile}
        />
        이미지 업로드
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      {props.images[0] ? (
        <div
          style={{
            width: "50px",
            height: "50px",
            overflow: "hidden",
          }}
        >
          <Image
            onClick={onClickBig}
            src={`https://storage.googleapis.com/${props.images}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "zoom-in",
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </Stack>
  )
}
