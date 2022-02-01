import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { ReactChild } from "react"
import LayoutBanner from "./banner"
import LayoutFooter from "./footer"
import LayoutHeader from "./header"
import LayoutNavigation from "./navigation"

const BodyWrapper = styled.div`
  display: flex;
`

const LayoutSidebar = styled.div`
  width: 200px;
  height: 1000px;
  background-color: blue;
`

const HIDDEN_HEADERS = [
  "/12-06-modal-address-refactoring",
  // ...
  // ...
]

interface IProps {
  children: ReactChild
}

export default function Layout(props: IProps) {
  const router = useRouter()
  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath)

  return (
    <>
      {!isHiddenHeader && <LayoutHeader />}
      <LayoutBanner />
      <LayoutNavigation />
      <BodyWrapper>
        <LayoutSidebar />
        <div>{props.children}</div>
      </BodyWrapper>
      <LayoutFooter />
    </>
  )
}
