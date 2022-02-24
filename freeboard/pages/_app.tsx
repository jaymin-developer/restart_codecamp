// import "../styles/globals.css"
import "antd/dist/antd.css"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client"
import { AppProps } from "next/app"
import { Global } from "@emotion/react"
import Layout from "../src/components/commons/layout"
import { globalStyles } from "../src/commons/styles/globalStyles"
import { createUploadLink } from "apollo-upload-client"
import { onError } from "@apollo/client/link/error"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { getAccessToken } from "../src/commons/libraries/getAccessToken"
import { useRouter } from "next/router"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

interface IGlobalContext {
  accessToken?: string
  setAccessToken?: Dispatch<SetStateAction<string>>
}

export const GlobalContext = createContext<IGlobalContext>(
  {}
  // {
  //   accessToken: "",
  //   setAccessToken: () => {}
  // }
)

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState("")
  // const router = useRouter()

  const value = {
    accessToken,
    setAccessToken,
  }

  // 브라우저가 있으면
  // if (process.browser) {
  //   if (localStorage.getItem("accessToken")) {
  //     setAccessToken(localStorage.getItem("accessToken") || "");
  //   }
  // }

  // 다른 방법 윈도우가 있을 때, 브라우저가 있을 때
  // if (typeof window !== "undefined") {
  //   if (localStorage.getItem("accessToken")) {
  //     setAccessToken(localStorage.getItem("accessToken") || "");
  //   }
  // }

  // useEffect, 서버에서 실행되지 않는다. 한 번만 실행된다.
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAccessToken(localStorage.getItem("accessToken") || "")
    }
    console.log(accessToken)
    getAccessToken().then((newAccessToken) => {
      // 4. 재발급 받은 accessToken 저장하기
      setAccessToken(newAccessToken)
    })
  }, [])

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 2. 해당 에러가 토큰 만료 에러인지 체크(UNAUTHENTICATED)
        console.log(err)
        if (err.extensions.code === "UNAUTHENTICATED") {
          // 3. refreshToken으로 accessToken을 재발급 받기
          getAccessToken().then((newAccessToken) => {
            // 4. 재발급 받은 accessToken 저장하기
            setAccessToken(newAccessToken)
            // 5. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기
            operation.setContext({
              headers: {
                ...operation.getContext().headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            }) // 설정 변경(accessToken 바꿔치기)
            return forward(operation) // 변경된 operation 재요청
          })
        }
      }
    }
  })

  const uploadLink = createUploadLink({
    uri: "https://backend05.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  })

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    // 다른 기능들을 연결하겠다.
    cache: new InMemoryCache(),
  })

  return (
    <GlobalContext.Provider value={value}>
      <ApolloProvider client={client}>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </GlobalContext.Provider>
  )
}

export default MyApp
