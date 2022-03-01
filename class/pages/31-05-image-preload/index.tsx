import { useEffect, useRef, useState } from "react";

export default function ImagePreloadPage() {
  // 오래 걸리는 이미지에다가 나중에 바로 로드하게끔 미리 프리로드해놓자
  const [loaded, setLoaded] = useState(false);
  const [imgTag, setImgTag] = useState<HTMLImageElement>();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src =
      "https://cdn.notefolio.net/img/d7/5b/d75bf02e2a35f76dba6ed5eeccde793c45d74edd83df838e31290603ceb5c5c9_v1.jpg";
    img.onload = () => {
      setImgTag(img);
    };
  }, []);

  const onClickImagePreLoad = () => {
    if (imgTag) divRef.current?.appendChild(imgTag);
  };

  const onClickImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div>
      ================== 이미지 프리로드 ==================
      <div ref={divRef}></div>
      <button onClick={onClickImagePreLoad}>이미지 프리로드</button>
      ================== 이미지 일반로드 ==================
      {loaded && (
        <img src="https://cdn.notefolio.net/img/d7/5b/d75bf02e2a35f76dba6ed5eeccde793c45d74edd83df838e31290603ceb5c5c9_v1.jpg" />
      )}
      <button onClick={onClickImageLoad}>이미지 일반로드</button>
    </div>
  );
}
