import LoginPageUI from "./login.presenter"
import { useState } from "react"
import { useRouter } from "next/router"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

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
  const onClickLogin = () => {
    if (/^\w+@\w+\.\w+$/.test(email) === false) {
      setEmailError("올바른 이메일 형식이 아닙니다.")
    }
    if (email !== "admin@book.com") {
      setEmailError("존재하지 않는 이메일입니다.")
    }

    if (
      /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
        password
      ) === false
    ) {
      setPasswordError("8~16자의 영문,숫자,특수 문자의 조합하여 작성해주세요.")
    }
    if (
      /^\w+@\w+\.\w+$/.test(email) &&
      /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
        password
      ) &&
      email === "admin@book.com" &&
      password === "book123!@"
    ) {
      alert(`관리자님 환영합니다`)
      router.push(`/boards`)
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
