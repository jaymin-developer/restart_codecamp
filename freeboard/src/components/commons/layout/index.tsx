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
  display: flex;
`

const ChildrenBody = styled.div`
  width: 100%;
`

const HIDDEN = ["/login", "/signup"]
// const HIDDEN_BANNER = ["/boards", "/login", "/signup"]
// const HIDDEN_FOOTER = ["/boards", "/login", "/signup"]

export default function Layout(props: IProps) {
  const router = useRouter()
  const isHidden = HIDDEN.includes(router.asPath)
  // const isHiddenBanner = HIDDEN_BANNER.includes(router.asPath)
  // const isHiddenFooter = HIDDEN_FOOTER.includes(router.asPath)

  return (
    <Wrapper>
      <LayoutHeader />
      {isHidden || <LayoutBanner />}

      {isHidden || <LayoutNavigation />}

      <BodyWrapper>
        {isHidden || <LayoutSidebar />}
        <ChildrenBody>{props.children}</ChildrenBody>
      </BodyWrapper>
      <LayoutFooter />
    </Wrapper>
  )
}
