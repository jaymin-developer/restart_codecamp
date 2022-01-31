import styled from "@emotion/styled"

export const Wrapper = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
`

export const LoginHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Logo = styled.div`
  font-size: 60px;
`

export const Moto = styled.div`
  padding-top: 36px;
  font-size: 20px;
  color: gray;
`
export const LoginBody = styled.div`
  width: 100%;
`
export const Email = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 18px;
  box-sizing: border-box;
`
export const Password = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 18px;
  box-sizing: border-box;
`

export const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  background-color: darkred;
  color: white;
  font-size: 18px;
  :hover {
    cursor: pointer;
  }
`

export const LoginFooter = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const FindEmail = styled.div``
export const FindPassword = styled.div``
export const SignUp = styled.div`
  :hover {
    cursor: pointer;
  }
`

export const SocialLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  border-radius: 38px;
  padding: 20px 0;
  background-color: #fae100;
  border: 2px solid none;
  margin-top: 10px;
  cursor: pointer;
`
export const SocialLoginButtonImg = styled.img`
  width: 32px;
  height: 30px;
  margin-right: 20px;
`
export const SocialLoginButtonTitle = styled.div`
  opacity: 1;
  font-size: 16px;
  font-weight: bold;
`