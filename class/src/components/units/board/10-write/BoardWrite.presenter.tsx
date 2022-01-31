import * as S from "./BoardWrite.styles";
import { IBoardWriteUIProps } from "./BoardWrite.types";

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  return (
    <>
      <h1>{props.isEdit ? "수정하기" : "등록하기"}</h1>
      작성자:{" "}
      <S.MyInput
        type="text"
        onChange={props.ddd}
        defaultValue={props.data?.fetchBoard.writer}
        // 등록하기에는 데이터가 없으므로 축약 가능
      />
      <br />
      제목:{" "}
      <S.MyInput
        type="text"
        onChange={props.eee}
        defaultValue={props.isEdit ? props.data?.fetchBoard.title : ""}
      />
      <br />
      내용:{" "}
      <S.MyInput
        type="text"
        onChange={props.fff}
        defaultValue={props.isEdit ? props.data?.fetchBoard.contents : ""}
      />
      <br />
      <S.MyButton
        onClick={props.isEdit ? props.xxx : props.ccc}
        isActive={props.isActive}
      >
        {props.isEdit ? "수정하기" : "등록하기"}
      </S.MyButton>
      {/* 위 아래로 두 가지의 방법이 있다. 삼항 연산자는 짧을 때 가능함*/}
      {/* {props.isEdit ? (
        <S.MyButton onClick={props.xxx} isActive={props.isActive}>
          수정하기
        </S.MyButton>
      ) : (
        <S.MyButton onClick={props.ccc} isActive={props.isActive}>
          수정하기
        </S.MyButton>
      )} */}
      {/* 방법 한 가지 더 */}
      {/* {props.isEdit && (
        <S.MyButton onClick={props.xxx} isActive={props.isActive}>
          수정하기
        </S.MyButton>
      )}
      {!props.isEdit && (
        <S.MyButton onClick={props.ccc} isActive={props.isActive}>
          수정하기
        </S.MyButton>
      )} */}
      <div>{props.bbb}</div>
    </>
  );
}
