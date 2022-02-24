import axios from "axios"
import { useState } from "react"

export default function CallbackPromiseAsyncawaitPage() {
  const [num, setNum] = useState()
  const [title, setTitle] = useState("")
  const [contents, setContents] = useState("")
  const [list, setList] = useState([])

  const onClickCallback = () => {
    // function qqq(){

    // }
    const aaa = new XMLHttpRequest()
    aaa.open("get", "http://numbersapi.com/random?min=1&max=200")
    aaa.send()
    aaa.addEventListener("load", (res: any) => {
      const num = res.target.response.split(" ")[0] // 71(랜덤숫자)
      setNum(num)
      const bbb = new XMLHttpRequest()
      bbb.open("get", `http://koreanjson.com/posts/${num}`)
      bbb.send()
      bbb.addEventListener("load", (res: any) => {
        const userId = JSON.parse(res.target.response).UserId
        console.log(res.target.response)
        setTitle(JSON.parse(res.target.response).title)
        setContents(JSON.parse(res.target.response).content)

        const ccc = new XMLHttpRequest()
        ccc.open("get", `http://koreanjson.com/posts?userId=${userId}`)
        ccc.send()
        ccc.addEventListener("load", (res: any) => {
          console.log("최종결과값!!!")
          console.log(JSON.parse(res.target.response))
          setList(JSON.parse(res.target.response))
        })
      })
    })
  }

  //   콜백 지옥과 달리 체인형태로 변경 .then 직관적이지 못함
  const onClickPromise = () => {
    console.log("여기는 1번")
    axios
      .get("http://numbersapi.com/random?min=1&max=200")
      .then((res) => {
        console.log("여기는 2번")
        const num = res.data.split(" ")[0]
        setNum(num)
        return axios.get(`http://koreanjson.com/posts/${num}`)
      })
      .then((res) => {
        console.log("여기는 3번")
        console.log(res)
        setTitle(res.data.title)
        setContents(res.data.content)
        const userId = res.data.UserId
        return axios.get(`http://koreanjson.com/posts?userId=${userId}`)
      })
      .then((res) => {
        console.log("여기는 4번")
        console.log(res)
        setList(res.data)
      })
    console.log("여기는 5번")
  }
  const onClickAsyncAwait = async () => {
    const res1 = await axios.get("http://numbersapi.com/random?min=1&max=200")
    const num = res1.data.split(" ")[0]
    setNum(num)

    const res2 = await axios.get(`http://koreanjson.com/posts/${num}`)
    const userId = res2.data.UserId
    setTitle(res2.data.title)
    setContents(res2.data.content)

    const res3 = await axios.get(`http://koreanjson.com/posts?userId=${userId}`)
    console.log(res3)
    setList(res3.data)
  }

  return (
    <div>
      <button onClick={onClickCallback}>Callback</button>
      <button onClick={onClickPromise}>Promise</button>
      <button onClick={onClickAsyncAwait}>AsyncAwait</button>

      <div>
        <span style={{ color: "blue" }}>불러온 숫자 :</span> {num}
      </div>
      <div>
        <span style={{ color: "blue" }}>숫자에 따른 제목 :</span> {title}
      </div>
      <div>
        <span style={{ color: "blue" }}>숫자에 따른 내용 :</span> {contents}
      </div>
      <br />
      {list.map((el) => (
        <div key={el.id}>
          <span>번호 : {el.id}</span>
          <br />
          <span>제목 :{el.title}</span>
          <br />
          <span>게시글 :{el.content}</span>
          <br />
          <br />
        </div>
      ))}
    </div>
  )
}
