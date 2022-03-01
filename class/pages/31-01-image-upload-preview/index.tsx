import { ChangeEvent, useState } from "react";

export default function ImageUploadPreviewPage() {
  const [imageUrl, setImageUrl] = useState("");

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
      }
    };
  };

  return (
    <div>
      <img src={imageUrl} />
      <input type="file" onChange={onChangeFile} />
    </div>
  );
}
