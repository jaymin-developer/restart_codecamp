// import ReactQuill from "react-quill"; 다이나믹 임포트로 변경하기!!
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// 서버사이드 렌더링은 안 하고 브라우저에서만 하게 ssr : false

export default function WebEditorPage() {
  const handleChange = (value: string) => {
    console.log(value);
  };

  if (process.browser) {
    console.log("나는 브라우저");
  } else {
    console.log("나는 프론트서버");
  }

  return (
    <div>
      작성자 : <input type="text" />
      <br />
      비밀번호 : <input type="password" />
      <br />
      제목 : <input type="text" />
      <br />
      내용 : <ReactQuill onChange={handleChange} />
      <br />
      <button>등록하기</button>
    </div>
  );
}
