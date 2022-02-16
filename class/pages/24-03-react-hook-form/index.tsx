import { useForm } from "react-hook-form";

interface FormValues {
  myWriter?: string;
  myTitle?: string;
  myContents?: string;
}

export default function ReactHookFormPage() {
  const { register, handleSubmit } = useForm();

  const onClickSubmit = (data: FormValues) => {
    console.log(data);
  };

  console.log("리랜더링 되는지 체크체크");

  return (
    //   form으로 사용해야한다. input들을 묶어준다.
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자 : <input type="text" {...register("myWriter")} />
      제목 : <input type="text" {...register("myTitle")} />
      내용 : <input type="text" {...register("myContents")} />
      <button>등록하기</button>
      {/* <button>은 form에 저장되어 있는 함수로 실행된다. 디폴트값이 submit임. */}
      {/* <button type="button">나만의 버튼</button> */}
      {/* 타입을 button으로 하고 onClick */}
    </form>
  );
}
// 상황에 맞게 사용하자. 중요한 데이터가 아니라면 비제어로 진행하자.
