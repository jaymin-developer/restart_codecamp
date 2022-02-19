import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { ReactChild } from "react"
import LayoutBanner from "./banner"
import LayoutFooter from "./footer"
import LayoutHeader from "./header"
import LayoutNavigation from "./navigation"
import LayoutSidebar from "./sidebar"
import LayoutSidebar2 from "./sidebar2"

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
  min-width: 60%;
  max-width: 100%;
  /* padding: 10px 80px; */
`

export default function Layout(props: IProps) {
  const router = useRouter()
  const HIDDEN = [
    "/login",
    "/signup",
    "/boards/new",
    "/usedItems/new",
    `/boards/${router.query.id}/edit`,
    `/usedItems/${router.query.id}/edit`,
  ]
  const HIDDEN_BANNER = [
    `/boards/${router.query.id}`,

    `/usedItems/${router.query.id}`,
  ]
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
        {isAllHidden || isHidden || <LayoutSidebar2 />}
      </BodyWrapper>
      {isHidden || <LayoutFooter />}
    </Wrapper>
  )
}
