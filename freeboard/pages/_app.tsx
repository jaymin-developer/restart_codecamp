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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
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
  }, [])

  const uploadLink = createUploadLink({
    uri: "http://backend05.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
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
