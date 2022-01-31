import { ChangeEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import { useRouter } from "next/router";
import { IBoardWriteProps } from "./BoardWrite.types";

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [aaa, setAaa] = useState("");
  const [qqq] = useMutation(CREATE_BOARD);
  const [www] = useMutation(UPDATE_BOARD);

  const zzz = async () => {
    // const result = await axios.get("https://koreanjson.com/posts/1")
    const result = await qqq({
      variables: { writer, title, contents },
    });
    console.log(result.data.createBoard.message);
    setAaa(result.data.createBoard.message);

    router.push(`/09-01-boards/${result.data.createBoard.number}`);
  };

  const xxx = async () => {
    interface IMyVariables {
      number: number;
      writer?: string;
      title?: string;
      contents?: string;
    }

    const myVariables: IMyVariables = {
      number: Number(router.query.number),
    };
    if (writer) myVariables.writer = writer;
    if (title) myVariables.title = title;
    if (contents) myVariables.contents = contents;
    // myVariables라는 객체를 만들어서 수정된 데이터의 여부를 파악하고 보내준다.
    // if 문에서 실행문이 한 줄이면 {} 생략 가능하다.

    const result = await www({
      variables: myVariables,
    });
    console.log(result.data.updateBoard.message);
    router.push(`/09-01-boards/${result.data.updateBoard.number}`);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (event.target.value && title && contents) {
      setIsActive(true);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (writer && event.target.value && contents) {
      setIsActive(true);
    }
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
    if (writer && title && event.target.value) {
      setIsActive(true);
    }
  };

  return (
    <BoardWriteUI
      bbb={aaa}
      ccc={zzz}
      xxx={xxx}
      ddd={onChangeWriter}
      eee={onChangeTitle}
      fff={onChangeContents}
      isActive={isActive}
      isEdit={props.isEdit}
      data={props.data}
    />
  );
}
