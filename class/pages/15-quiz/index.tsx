import { gql, useQuery } from "@apollo/client"
import InfiniteScroll from "react-infinite-scroller"
import styled from "@emotion/styled"

const ScrollerBox = styled.div`
  height: 500px;
  overflow: auto;
`

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
    }
  }
`

export default function PageNationPage() {
  const { data, fetchMore } = useQuery(FETCH_BOARDS, {
    variables: { page: 1 },
  })

  const onLoadMore = () => {
    if (!data) return

    fetchMore({
      variables: { page: Math.ceil(data.fetchBoards.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoards)
          return { fetchBoards: [...prev.fetchBoards] }
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        }
      },
    })
  }

  return (
    <div>
      <ScrollerBox>
        <h1>무한 스크롤 연습</h1>
        <InfiniteScroll
          pageStart={0}
          loadMore={onLoadMore}
          hasMore={true || false}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
        >
          {data?.fetchBoards?.map((el) => (
            <div key={el._id}>
              <span>
                {el.title} {el.writer}
              </span>
            </div>
          ))}
        </InfiniteScroll>
      </ScrollerBox>
    </div>
  )
}
