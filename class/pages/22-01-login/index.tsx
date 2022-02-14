import { useMutation, gql } from "@apollo/client"
import { ChangeEvent, useContext, useState } from "react"
import { Modal } from "antd"
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../src/commons/types/generated/types"
import { GlobalContext } from "../_app"
import { useRouter } from "next/router"

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`

export default function LoginPage() {
  const { accessToken, setAccessToken } = useContext(GlobalContext)
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">, // Omit => 특정 데이터 빼고 나머지 다 가져와줘 // Partial => ? 붙여서 가져와줘. 유틸리티 타입
    IMutationLoginUserArgs
  >(LOGIN_USER)

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onClickLogin = async () => {
    try {
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      })
      console.log(result.data?.loginUser.accessToken)
      accessToken && setAccessToken(result.data?.loginUser.accessToken || "")
      // : alert("로그인을 먼저 해주세요");

      accessToken && router.push("/22-02-login-success")
      // 로그인 성공 페이지로 이동하기
    } catch (error) {
      if (error instanceof Error)
        Modal.error({ content: "로그인을 먼저 해주세요" })
    }
  }

  return (
    <div>
      이메일: <input type="text" onChange={onChangeEmail} />
      비밀번호 : <input type="password" onChange={onChangePassword} />
      <button onClick={onClickLogin}>로그인하기!!</button>
    </div>
  )
}
