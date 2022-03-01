import { memo } from "react";

function MemoizationPresenterPage(props) {
  console.log("프리젠터가 렌더링됩니다!!!");
  return (
    <div>
      <div>=================</div>
      <h1>이것은 프리젠터 입니다!!!</h1>
      <div>=================</div>
    </div>
  );
}

export default memo(MemoizationPresenterPage);
// 메모를 활용하니 프리젠터 렌더링 반복해서 안 된다.

// 바뀐 값으로 props가 들어온다면 리렌더가 된다. 쓰려고 넘기는 거니까.
// 활용 예시 https://medium.com/@freshmilkdev/reactjs-render-optimization-for-collapsible-material-ui-long-list-with-checkboxes-231b36892e20
