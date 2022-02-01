import LoginPageUI from "../login/login.presenter"
import { SetStateAction, useState } from "react"
import { useRouter } from "next/router"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const onChangeEmail = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setEmail(event.target.value)
    if (email.includes("@")) {
      setEmailError("")
    }
  }

  const onChangePassword = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setPassword(event.target.value)
    if (password.length >= 8 && password.length <= 16) {
      setPasswordError("")
    }
  }

  console.log(passwordError)
  console.log(emailError)
  const onClickLogin = () => {
    if (
      emailError === "" &&
      passwordError === "" &&
      email === "admin@book.com" &&
      password === "book12345"
    ) {
      alert(`관리자님 환영합니다`)
      router.push(`/signup`)
    } else {
      // alert("이메일 혹은 비밀번호를 확인해주세요.")
      setEmailError("이메일 주소를 다시 확인해주세요.")
      setPasswordError("8~16자의 영문,숫자,특수 문자만 사용 가능합니다.")
    }
  }

  const onClickSignUp = () => {
    router.push(`/signup`)
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
    ></LoginPageUI>
  )
}
