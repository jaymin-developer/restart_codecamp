import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button01 from "../../src/components/commons/buttons/01";
import Input01 from "../../src/components/commons/inputs/01";

const schema = yup.object().shape({
  myEmail: yup
    .string()
    .email("이메일 형식이 적합하지 않습니다.")
    .required("이메일은 필수 입력 사항입니다."),
  myPassword: yup
    .string()
    .min(8, "비밀번호는 최소 8자리 이상 입력해주세요.")
    .max(16, "비밀번호는 최대 16자리로 입력해주세요.")
    .required("비밀번호는 필수 입력 사항입니다."),
});

interface FormValues {
  myEmail?: string;
  myPassword?: string;
}

export default function ReactHookFormPage() {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    // 리액트 훅 폼과 연결한다.
  });

  const onClickSubmit = (data: FormValues) => {
    console.log(data);
  };

  console.log("리랜더링 되는지 체크체크");

  return (
    //   form으로 사용해야한다. input들을 묶어준다.
    <form onSubmit={handleSubmit(onClickSubmit)}>
      {/* 이메일 : <input type="text" {...register("myEmail")} /> */}
      이메일 : <Input01 type="text" register={register("myEmail")} />
      <div>{formState.errors.myEmail?.message}</div>
      {/* 비밀번호 : <input type="password" {...register("myPassword")} /> */}
      비밀번호 : <Input01 type="password" register={register("myPassword")} />
      <div>{formState.errors.myPassword?.message}</div>
      <Button01 isValid={formState.isValid} name="로그인" />
      {/* <button>은 form에 저장되어 있는 함수로 실행된다. 디폴트값이 submit임. */}
      {/* <button type="button">나만의 버튼</button> */}
      {/* 타입을 button으로 하고 onClick */}
    </form>
  );
}
// 상황에 맞게 사용하자. 중요한 데이터가 아니라면 비제어로 진행하자.
