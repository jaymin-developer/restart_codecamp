import styled from "@emotion/styled"

const Wrapper = styled.div`
  min-width: 20%;
  padding: 20px;
  height: 800px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: sticky;
  top: 150px;
`

export default function LayoutNavigation() {
  return (
    <Wrapper>
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=555617&template=carousel&trackingCode=AF6105147&subId=&width=300&height=700"
        width="80%"
        height="700"
        frameBorder="0"
        scrolling="yes"
        referrerPolicy="unsafe-url"
      ></iframe>
    </Wrapper>
  )
}
