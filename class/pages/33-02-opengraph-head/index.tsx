import Head from "next/head";

// 우리 페이지, 사이트 개발자
export default function OpenGraphHeadPage() {
  return (
    <>
      <Head>
        <meta property="og:title" content="내사이트" />
        <meta property="og:description" content="환영합니다" />
      </Head>
      <div>오픈그래프 연습 페이지입니다!!!</div>
    </>
  );
}
