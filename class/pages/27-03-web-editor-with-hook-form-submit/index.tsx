import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
// import ReactQuill from "react-quill"; 다이나믹 임포트로 변경하기!!
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../src/commons/types/generated/types";
import { useRouter } from "next/router";
import { Modal } from "antd";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// 서버사이드 렌더링은 안 하고 브라우저에서만 하게 ssr : false

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

interface IFromValues {
  writer?: string;
  password?: string;
  title?: string;
  contents?: string;
}

export default function WebEditorPage() {
  const router = useRouter();
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

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
  // handleSubmit 감싸주기.

  // Object.values(data).every(el => el !== undefined)
  // 키라고 하면 writer, password, title, contents 를 갖고 오고 values라면 data.writer, data.password, data.title, data.contents 갖고 옴

  const onClickSubmit = async (data: IFromValues) => {
    if (!(data.writer && data.password && data.title && data.contents)) {
      Modal.warn({ content: "필수 입력 사항입니다!" });
      return;
    }

    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: data.writer,
            password: data.password,
            title: data.title,
            contents: data.contents,
          },
        },
      });
      router.push(`/27-04-web-editor-detail/${result.data?.createBoard._id}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자 : <input type="text" {...register("writer")} />
      <br />
      비밀번호 : <input type="password" {...register("password")} />
      <br />
      제목 : <input type="text" {...register("title")} />
      <br />
      내용 : <ReactQuill onChange={handleChange} />
      <br />
      <button>등록하기</button>
    </form>
  );
}
