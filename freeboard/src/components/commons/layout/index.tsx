import styled from "@emotion/styled"
import { ReactChild } from "react"
import LayoutBanner from "./banner"
import LayoutFooter from "./footer"
import LayoutHeader from "./header"
import LayoutNavigation from "./navigation"

interface IProps {
  children: ReactChild
}
const BodyWrapper = styled.div`
  display: flex;
`

const LayoutSidebar = styled.div`
  width: 200px;
  height: 1000px;
  background-color: blue;
`

export default function Layout(props: IProps) {
  return (
    <>
      <LayoutHeader />
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
