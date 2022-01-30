import { useState } from "react";
import { useMutation } from "@apollo/client";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import { useRouter } from "next/router";

export default function BoardWrite(props) {
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

    router.push(`/08-05-boards/${result.data.createBoard.number}`);
  };

  const xxx = async () => {
    const result = await www({
      variables: {
        number: Number(router.query.number),
        writer,
        title,
        contents,
      },
    });
    console.log(result.data.updateBoard.message);
    router.push(`/08-05-boards/${result.data.updateBoard.number}`);
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
    if (event.target.value && title && contents) {
      setIsActive(true);
    }
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (writer && event.target.value && contents) {
      setIsActive(true);
    }
  };

  const onChangeContents = (event) => {
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
    />
  );
}
