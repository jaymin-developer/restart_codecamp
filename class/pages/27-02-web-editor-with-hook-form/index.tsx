import { useForm } from "react-hook-form";
// import ReactQuill from "react-quill"; 다이나믹 임포트로 변경하기!!
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// 서버사이드 렌더링은 안 하고 브라우저에서만 하게 ssr : false

export default function WebEditorPage() {
  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const handleChange = (value: string) => {
    console.log(value);

    // 레지스터로 등록하지 않고, 강제로 값을 넣어주는 기능
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // onChange가 됐는지 안 됐는지 react-hook-form에 알려주는 기능!
    trigger("contents");
  };

  // if (process.browser) {
  //   console.log("나는 브라우저");
  // } else {
  //   console.log("나는 프론트서버");
  // }

  // 레지스터는 클릭만 해도 확인 가능한데 setValue는 값만 바뀌지 인식을 못하는 상황. yup 적용 및 검증 안 되는데 trigger로 해결 가능
  return (
    <div>
      작성자 : <input type="text" {...register("writer")} />
      <br />
      비밀번호 : <input type="password" {...register("password")} />
      <br />
      제목 : <input type="text" {...register("title")} />
      <br />
      내용 : <ReactQuill onChange={handleChange} />
      <br />
      <button>등록하기</button>
    </div>
  );
}
