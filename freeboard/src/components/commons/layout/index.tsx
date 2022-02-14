import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { ReactChild } from "react"
import LayoutBanner from "./banner"
import LayoutFooter from "./footer"
import LayoutHeader from "./header"
import LayoutNavigation from "./navigation"
import LayoutSidebar from "./sidebar"

interface IProps {
  children: ReactChild
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const BodyWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`

const ChildrenBody = styled.div`
  min-width: 70%;
`

const LayoutRightSidebar = styled.div`
  min-width: 15%;
`

export default function Layout(props: IProps) {
  const router = useRouter()
  const HIDDEN = ["/login", "/signup", "/boards/new"]
  const HIDDEN_BANNER = [`/boards/${router.query.id}`]
  const HIDDEN_ALL = ["/landing", "/"]
  const isHidden = HIDDEN.includes(router.asPath)
  const isAllHidden = HIDDEN_ALL.includes(router.asPath)
  const isBannerHidden = HIDDEN_BANNER.includes(router.asPath)

  return (
    <Wrapper>
      {isAllHidden || <LayoutHeader />}
      {isAllHidden || isHidden || isBannerHidden || <LayoutBanner />}
      {isAllHidden || <LayoutNavigation />}
      <BodyWrapper>
        {isAllHidden || isHidden || <LayoutSidebar />}
        <ChildrenBody>{props.children}</ChildrenBody>
        {isAllHidden || isHidden || <LayoutRightSidebar />}
      </BodyWrapper>
      {isHidden || <LayoutFooter />}
    </Wrapper>
  )
}
