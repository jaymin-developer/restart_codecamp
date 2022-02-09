import styled from "@emotion/styled"

const Wrapper = styled.div`
  margin: 50px 0px 0px 50px;
  padding: 20px;
  width: 300px;
  height: 300px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 50px;
  left: 60px;
`

export default function LayoutNavigation() {
  return (
    <Wrapper>
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=555617&template=carousel&trackingCode=AF6105147&subId=&width=300&height=700"
        width="100%"
        height="700"
        frameBorder="0"
        scrolling="no"
        referrerPolicy="unsafe-url"
      ></iframe>
    </Wrapper>
  )
}
