import axios from "axios"
import { useEffect, useState } from "react"

export default function OpenapiPage() {
  const [dogUrl, setDogUrl] = useState()

  useEffect(() => {
    async function fetchDog() {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random")
      console.log(result.data)
      setDogUrl(result.data.message)
    }
    fetchDog()
  }, [])

  return (
    <div>
      <div>오픈API 연습!!</div>
      <img src={dogUrl} />
    </div>
  )
}
