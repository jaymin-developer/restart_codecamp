import Head from "next/head";
import { useRouter } from "next/router";

export default function BoardsDetailPage() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <meta property="og:title" content="나의 게시판입니다" />
        <meta
          property="og:description"
          content="저의 게시판에 오신 것을 환영합니다"
        />
        <meta
          property="og:image"
          content="https://w.namu.la/s/9071d0575b6d14c0d6fc5832e26fe8ef0a298a1abb1d442cc3c865534ec5e949e8a2d195fe425ebb15f2f1f5b270e6b86979bd1e3fcb4e9d9432bdfbf4fb02a6ef1dadc3477ddb5e704cd37314ac39a1"
        />
      </Head>
      <div>
        안녕하세요! 게시글 상세페이지 입니다!! 게시글 ID는{" "}
        {router.query.boardId}
        입니다.
      </div>
    </div>
  );
}
