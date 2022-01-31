import SignUpPageUI from "./SignUp.presenter"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "./SignUp.queries"
import { useRouter } from "next/router"

export default function SignUpPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  // const [emailError, setEmailError] = useState("")

  const [name, setName] = useState("")
  // const [nameError, setNameError] = useState("")

  const [password, setPassword] = useState("")
  // const [passwordError, setPasswordError] = useState("")

  const [checkPassword, setCheckPassword] = useState("")
  // const [checkPasswordError, setCheckPasswordError] = useState("")

  const [createUser] = useMutation(CREATE_USER)

  function onChangeEmail(event) {
    setEmail(event.target.value)
  }

  function onChangeName(event) {
    setName(event.target.value)
  }

  function onChangePassword(event) {
    setPassword(event.target.value)
  }

  function onChangeCheckPassword(event) {
    setCheckPassword(event.target.value)
  }

  async function onClickSignUp() {
    if (email === "") {
      // setEmailError("이메일을 입력해주세요.")
      alert("이메일을 입력해주세요.")
    }
    if (name === "") {
      // setNameError("이름을 입력해주세요.")
      alert("이름을 입력해주세요.")
    }
    if (password === "") {
      // setPasswordError("비밀번호를 입력해주세요.")
      alert("비밀번호를 입력해주세요.")
    }
    if (checkPassword !== password) {
      // setCheckPasswordError("비밀번호를 다시 입력해주세요.")
      alert("비밀번호를 다시 입력해주세요.")
    }
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
      onChangeEmail={onChangeEmail}
      onChangeName={onChangeName}
      onChangePassword={onChangePassword}
      onChangeCheckPassword={onChangeCheckPassword}
      onClickSignUp={onClickSignUp}
    />
  )
}
