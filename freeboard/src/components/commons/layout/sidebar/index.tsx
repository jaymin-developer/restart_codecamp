import styled from "@emotion/styled"

const Wrapper = styled.div`
  margin: 50px 0px 0px 50px;
  padding: 20px;
  min-width: 15%;
  height: 700px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: sticky;
  top: 50px;
  left: 60px;
`

export default function LayoutNavigation() {
  return (
    <Wrapper>
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=555617&template=carousel&trackingCode=AF6105147&subId=&width=300&height=700"
        width="99%"
        height="600"
        frameBorder="0"
        scrolling="yes"
        referrerPolicy="unsafe-url"
      ></iframe>
    </Wrapper>
  )
}
