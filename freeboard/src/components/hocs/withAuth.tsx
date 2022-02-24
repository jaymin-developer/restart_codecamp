import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../../pages/_app"

// @ts-ignore

export const withAuth = (Component) => (props) => {
  const { accessToken } = useContext(GlobalContext)
  const router = useRouter()

  useEffect(() => {
    console.log(accessToken)
    if (!localStorage.getItem("accessToken")) {
      alert("로그인을 먼저 해주세요!!!")
      router.push("/login")
    }
  }, [])

  return <Component {...props} />
}
