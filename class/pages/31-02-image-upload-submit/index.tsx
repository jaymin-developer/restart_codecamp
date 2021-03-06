import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
    }
  }
`;

export default function ImageUploadSubmitPage() {
  const [file1, setFile1] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("파일이 없습니다!");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // blob: Blob 블랍, 삐랍. 사이즈가 큰 이미지 혹은 영상
    fileReader.onload = (data) => {
      if (typeof data.target?.result === "string") {
        console.log(data.target?.result);
        setImageUrl(data.target?.result);
        setFile1(file);
      }
    };
  };

  const onClickSubmit = async () => {
    // 1. image 업로드하기 url 받아오기
    //    - uploadFile()
    // 여러 개 파일이라면? async await를 개수만큼 기다려줘야한다. 2교시에 진행
    const result = await uploadFile({
      variables: {
        file: file1,
      },
    });
    const imageUrl = result.data?.uploadFile.url || "";
    // 2. createBoard로 게시물 등록하기
    //    - writer, title, contents 전송
    //    - imageurl 전송
    const result2 = await createBoard({
      variables: {
        createBoardInput: {
          writer: "영희",
          password: "1234",
          title: "안녕하세요~~",
          contents: "이미지 업로드 입니다@@",
          images: [imageUrl],
        },
      },
    });
    console.log(result2.data?.createBoard._id);
  };

  return (
    <div>
      <img src={imageUrl} />
      <input type="file" onChange={onChangeFile} />
      <button onClick={onClickSubmit}>등록하기</button>
    </div>
  );
}
