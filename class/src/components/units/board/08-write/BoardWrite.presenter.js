import * as S from "./BoardWrite.styles";

export default function BoardWriteUI(props) {
  return (
    <>
      <h1>{props.isEdit ? "수정하기" : "등록하기"}</h1>
      작성자: <S.MyInput type="text" onChange={props.ddd} />
      <br />
      제목: <S.MyInput type="text" onChange={props.eee} />
      <br />
      내용: <S.MyInput type="text" onChange={props.fff} />
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
