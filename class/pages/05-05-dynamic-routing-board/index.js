import { useRouter } from "next/router";

export default function StaticRoutingPage() {
  const router = useRouter();
  const onClickMove1 = () => {
    router.push("/05-06-dynamic-routed-board/1");
  };
  const onClickMove2 = () => {
    router.push("/05-06-dynamic-routed-board/2");
  };
  const onClickMove3 = () => {
    router.push("/05-06-dynamic-routed-board/3");
  };
  const onClickMove100 = () => {
    router.push("/05-06-dynamic-routed-board/100");
  };

  return (
    <>
      <button onClick={onClickMove1}>1번 게시글 이동하기!!</button>
      <button onClick={onClickMove2}>2번 게시글 이동하기!!</button>
      <button onClick={onClickMove3}>3번 게시글 이동하기!!</button>
      <button onClick={onClickMove100}>100번 게시글 이동하기!!</button>
    </>
  );
}
