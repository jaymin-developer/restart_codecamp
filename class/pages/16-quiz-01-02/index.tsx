import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

export default function FunctionLifecycleRefPage() {
  const [_, setIsChange] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    alert("Rendered!")
    inputRef.current?.focus()

    return () => {
      alert("Bye!!")
    }
  }, [])

  useEffect(() => {
    alert("Changed!")
  })

  const onClickChange = () => {
    setIsChange((prev) => prev + 1)
  }

  const onClickMove = () => {
    router.push("/")
  }

  return (
    <div>
      <input type="password" ref={inputRef} />
      <button onClick={onClickChange}>변경</button>
      <button onClick={onClickMove}>이동</button>
    </div>
  )
}
