import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

// 클래스형을 함수형으로 바꾸는 경우가 있기에 알아두자.
// 클래스형에서는 use가 들어있는 건 못 쓴다.
export default function FunctionLifecycleRefPage() {
  // js(container)
  const [count, setCount] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  // inputRef = createRef<HTMLInputElement>();

  // 배열 첨가 componentDidMount와 동일.
  useEffect(() => {
    console.log("마운트 됐다!")
    inputRef.current?.focus()

    // 5번 실행된다. render -> rerender
    // setCount((prev) => prev + 1);

    // componentWillUnmount 비슷
    return () => {
      console.log("여기서 나갈래요")
    }
  }, [])
  // []는 의존성배열, 안에 내용이 바꼈을 때 다시 그림
  // []가 아예 없으면 뭐든 바뀌면 다시 그림, 빈 배열은 한 번만 실행
  // return 이후 useEffect 실행

  console.log("나는 언제 실행?") // componentDidMount와 componentWillUnmount 비교

  // componentDidUpdate와 비슷 99% 비슷, 1% 다름, 뭐 하나 바뀌면 실행, class와 달리 처음 실행된다.
  useEffect(() => {
    console.log("수정되고 다시 그려짐")
    // setCount((prev) => prev + 1);
    // 무한 루프
  })

  //   // 한 번만 실행
  //    componentDidMount () {
  //     console.log("마운트 됐다!");
  //     // input태그 선택해서 포커스 깜빡거리게 하기
  //     inputRef.current?.focus();
  //   };

  //   // 렌더링 될 때마다 나옴
  //   componentDidUpdate () {
  //     console.log("수정되고 다시 그려짐");
  //   };

  //   // 나가기 전에 마지막으로 할 것들!
  //  componentWillUnmount () {
  //     console.log("여기서 나갈래요!!");
  //     // 채팅방이라고 하면 백엔드 컴퓨터에 채팅방 나감을 알리기
  //   };

  const onClickCounter = () => {
    console.log("카운터 클릭!")
    setCount((prev) => prev + 1)
  }

  const onClickMove = () => {
    router.push("/")
  }

  // 화면에 그려준다.
  return (
    // html(presenter)
    <div>
      <input type="text" ref={inputRef} />
      <div>현재카운트: {count}</div>
      <button
        onClick={
          onClickCounter
          // .bind(this)
        }
      >
        카운트 올리기
      </button>
      {/* bind(this) this의 동적을 정적으로 바꿔준다. */}
      <button onClick={onClickMove}>나가기</button>
    </div>
  )
}
