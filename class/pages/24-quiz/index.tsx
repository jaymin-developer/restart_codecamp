import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button01 from "../../src/components/commons/buttons/01";
import Input01 from "../../src/components/commons/inputs/01";

interface FormValues {
  myWriter?: string;
  myTitle?: string;
  myContents?: string;
  myPassword?: string;
}

const schema = yup.object().shape({
  myWriter: yup
    .string()
    .max(5, "작성자명은 최대 5자리 이하로 입력해주세요.")
    .required("작성자명은 필수 입력 사항입니다."),

  myPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{0,8}$/,
      "비밀번호는 영문, 숫자, 특수문자를 포함한 8자리 이내 문자열입니다."
    )
    .required("비밀번호는 필수 입력 사항입니다."),
  // .min(8, "비밀번호는 최소 8자리 이상 입력해주세요."),

  myTitle: yup
    .string()
    .max(100, "제목은 100자 이내 문자열입니다.")
    .required("이메일은 필수 입력 사항입니다."),

  myContents: yup
    .string()
    .max(1000, "내용은 1000자 이내 문자열입니다.")
    .required("내용은 필수 입력 사항입니다."),
});

export default function ReactHookFormPage() {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onClickSubmit = (data: FormValues) => {
    console.log(data);
  };

  console.log("리랜더링 되는지 체크체크");

  return (
    //   form으로 사용해야한다. input들을 묶어준다.
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자 : <Input01 type="text" register={register("myWriter")} />
      <div>{formState.errors.myWriter?.message}</div>
      비밀번호 : <Input01 type="password" register={register("myPassword")} />
      <div>{formState.errors.myPassword?.message}</div>
      제목 : <Input01 type="text" register={register("myTitle")} />
      <div>{formState.errors.myTitle?.message}</div>
      내용 : <Input01 type="text" register={register("myContents")} />
      <div>{formState.errors.myContents?.message}</div>
      <Button01 isValid={formState.isValid} name="로그인" />
      {/* <button>은 form에 저장되어 있는 함수로 실행된다. 디폴트값이 submit임. */}
      {/* <button type="button">나만의 버튼</button> */}
      {/* 타입을 button으로 하고 onClick */}
    </form>
  );
}
// 상황에 맞게 사용하자. 중요한 데이터가 아니라면 비제어로 진행하자.
