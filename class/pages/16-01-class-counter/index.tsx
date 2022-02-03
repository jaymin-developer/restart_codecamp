import { Component } from "react"

interface IState {
  count: number
}

// 클래스형을 함수형으로 바꾸는 경우가 있기에 알아두자.
// 클래스형에서는 use가 들어있는 건 못 쓴다.
export default class ClassCounterPage extends Component {
  // js(container)
  state = {
    count: 0,
  }

  onClickCounter = () => {
    //   렉시컬 this
    console.log(this.state.count)
    // 여기서 this는 윈도우, 여기서의 this는 동적 this, 위치에 따라 바뀐다.
    // bind 혹은 함수형으로 만든다.

    console.log("카운터 클릭!")
    this.setState((prev: IState) => ({ count: prev.count + 1 }))
  }

  // 화면에 그려준다.
  render() {
    return (
      // html(presenter)
      <div>
        <div>현재카운트: {this.state.count}</div>
        <button onClick={this.onClickCounter.bind(this)}>카운트 올리기</button>
        {/* bind(this) this의 동적을 정적으로 바꿔준다. */}
      </div>
    )
  }
}
