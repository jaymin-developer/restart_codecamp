export default function LetHello() {
  function onClickChange() {
    document.getElementById("hello").innerText = "반갑습니다.";
  }

  return (
    <>
      <div id="hello">안녕하세요.</div>
      <button onClick={onClickChange}>클릭!</button>
    </>
  );
}
