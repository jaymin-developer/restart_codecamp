export default function ExampleUI(props) {
  return (
    <div>
      <h1>{props.aaa ? "수정" : "등록"}페이지</h1>
      제목 : <input type="text" />
      내용 : <input type="text" />
      <button>{props.aaa ? "수정" : "등록"}</button>
    </div>
  );
}
