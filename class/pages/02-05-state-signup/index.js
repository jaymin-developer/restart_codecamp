import { useState } from "react";

export default function StateSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  function onChangeEmail(event) {
    // event.target => <input type="text" /> 태그 전체를 가져옴.
    setEmail(event.target.value); // => 해당 태그의 값을 가져옴.
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onClickSignup() {
    if (!email.includes("@")) {
      setErrorEmail("이메일에 @가 없습니다. 잘못된 이메일이네요");
    } else {
      alert("회원가입을 축하합니다!");
    }
  }

  return (
    <>
      이메일 : <input type="text" onChange={onChangeEmail} />
      <br />
      <span>{errorEmail}</span>
      <br />
      <br />
      비밀번호: <input type="password" onChange={onChangePassword} />
      <br />
      <span>{errorPassword}</span>
      <br />
      <br />
      <button onClick={onClickSignup}>회원가입</button>
    </>
  );
}
