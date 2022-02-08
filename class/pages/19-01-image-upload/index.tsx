import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage() {
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);
  const [image, setImage] = useState("");

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    // files 뒤에 ?. null값이 될 수도

    // 리팩토링으로 얼리 엑시트, 없으면 끝낸다. if문 중첩보다 깔끔
    if (!file?.size) {
      alert("파일이 존재하지 않습니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("파일 용량이 큽니다.(제한 : 5MB)");
      return;
    }

    if (!file.type.includes("jpeg") && !file.type.includes("png")) {
      alert("jpeg, png 파일만 업로드 가능합니다");
      return;
    }

    // result에는 url
    try {
      const result = await uploadFile({
        variables: {
          file,
        },
      });
      console.log(result.data?.uploadFile.url);

      setImage(result.data?.uploadFile.url || "");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={onChangeFile} />
      <img src={`https://storage.googleapis.com/${image}`} />
    </div>
  );
}
