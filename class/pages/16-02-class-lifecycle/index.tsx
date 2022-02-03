import { Component } from "react";
import Router from "next/router";

interface IState {
  count: number;
}

// 클래스형을 함수형으로 바꾸는 경우가 있기에 알아두자.
// 클래스형에서는 use가 들어있는 건 못 쓴다.
export default class ClassCounterPage extends Component {
  // js(container)
  state = {
    count: 0,
  };

  // 한 번만 실행
  componentDidMount() {
    console.log("마운트 됐다!");
    // input태그 선택해서 포커스 깜빡거리게 하기
  }

  // 렌더링 될 때마다 나옴
  componentDidUpdate() {
    console.log("수정되고 다시 그려짐");
  }

  // 나가기 전에 마지막으로 할 것들!
  componentWillUnmount() {
    console.log("여기서 나갈래요!!");
    // 채팅방이라고 하면 백엔드 컴퓨터에 채팅방 나감을 알리기
  }

  onClickCounter = () => {
    //   렉시컬 this
    console.log(this.state.count);
    // 여기서 this는 윈도우, 여기서의 this는 동적 this, 위치에 따라 바뀐다.
    // bind 혹은 함수형으로 만든다.

    console.log("카운터 클릭!");
    this.setState((prev: IState) => ({ count: prev.count + 1 }));
  };

  onClickMove = () => {
    Router.push("/");
  };

  // 화면에 그려준다.
  render() {
    return (
      // html(presenter)
      <div>
        <div>현재카운트: {this.state.count}</div>
        <button
          onClick={
            this.onClickCounter
            // .bind(this)
          }
        >
          카운트 올리기
        </button>
        {/* bind(this) this의 동적을 정적으로 바꿔준다. */}
        <button onClick={this.onClickMove}>나가기</button>
      </div>
    );
  }
}
