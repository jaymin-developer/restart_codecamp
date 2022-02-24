import LoginPageUI from "./login.presenter"
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { GlobalContext } from "../../../../pages/_app"
import { gql, useMutation } from "@apollo/client"
import { Modal } from "antd"

const LOGIN_USER_EXAMPLE = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`

export default function LoginPage() {
  const { setAccessToken } = useContext(GlobalContext)
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loginUser] = useMutation(LOGIN_USER_EXAMPLE)

  const onChangeEmail = (event: { target: { value } }) => {
    setEmail(event.target.value)
    if (/^\w+@\w+\.\w+$/.test(event.target.value)) {
      setEmailError("")
    }
  }

  const onChangePassword = (event: { target: { value } }) => {
    setPassword(event.target.value)
    if (
      /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
        event.target.value
      )
    ) {
      setPasswordError("")
    }
  }

  const onClickLogin = async () => {
    try {
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      })
      const accessToken = result.data?.loginUser.accessToken

      if (/^\w+@\w+\.\w+$/.test(email) === false) {
        setEmailError("올바른 이메일 형식이 아닙니다.")
      }

      if (
        /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
          password
        ) === false
      ) {
        setPasswordError(
          "8~16자의 영문,숫자,특수 문자의 조합하여 작성해주세요."
        )
      }
      if (
        /^\w+@\w+\.\w+$/.test(email) &&
        /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
          password
        ) &&
        setAccessToken
      ) {
        setAccessToken(accessToken || "")
        localStorage.setItem("accessToken", accessToken || "")
        // 로그인 성공 페이지로 이동하기!!
        history.back()
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({ content: error.message })
        router.push("/login")
      }
    }
  }

  const onClickSignUp = () => {
    router.push(`/signup`)
  }

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      onClickLogin()
    }
  }

  return (
    <LoginPageUI
      email={email}
      password={password}
      emailError={emailError}
      passwordError={passwordError}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onClickLogin={onClickLogin}
      onClickSignUp={onClickSignUp}
      onCheckEnter={onCheckEnter}
    ></LoginPageUI>
  )
}
