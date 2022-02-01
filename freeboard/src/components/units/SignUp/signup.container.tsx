import SignUpPageUI from "./signup.presenter"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "./SignUp.queries"
import { useRouter } from "next/router"

export default function SignUpPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")

  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [checkPassword, setCheckPassword] = useState("")
  const [checkPasswordError, setCheckPasswordError] = useState("")

  const [createUser] = useMutation(CREATE_USER)

  function onChangeEmail(event) {
    setEmail(event.target.value)
    if (event.target.value.includes("@")) {
      setEmailError("")
    }
  }

  function onChangeName(event) {
    setName(event.target.value)
    if (event.target.value !== "") {
      setNameError("")
    }
  }

  function onChangePassword(event) {
    setPassword(event.target.value)
    if (event.target.value.length >= 8 && event.target.value.length <= 16) {
      setPasswordError("")
    }
  }

  function onChangeCheckPassword(event) {
    setCheckPassword(event.target.value)
    if (event.target.value === password) {
      setCheckPasswordError("")
    }
  }

  async function onClickSignUp() {
    if (email === "") {
      setEmailError("이메일을 입력해주세요.")
    }
    if (name === "") {
      setNameError("이름을 입력해주세요.")
    }
    if (password === "") {
      setPasswordError("8~16자의 영문,숫자,특수 문자만 사용 가능합니다.")
    }
    checkPassword === ""
      ? setCheckPasswordError("비밀번호를 다시 입력해주세요.")
      : checkPassword !== password &&
        setCheckPasswordError("비밀번호와 일치하지 않습니다.")

    if (email && name && password && checkPassword === password) {
      try {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password,
              name,
            },
          },
        })
        alert("회원가입이 되었습니다. 로그인을 해주세요.")
        router.push(`/login`)
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <SignUpPageUI
      email={email}
      name={name}
      password={password}
      checkPassword={checkPassword}
      emailError={emailError}
      nameError={nameError}
      passwordError={passwordError}
      checkPasswordError={checkPasswordError}
      onChangeEmail={onChangeEmail}
      onChangeName={onChangeName}
      onChangePassword={onChangePassword}
      onChangeCheckPassword={onChangeCheckPassword}
      onClickSignUp={onClickSignUp}
    />
  )
}
