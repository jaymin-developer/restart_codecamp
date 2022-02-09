import { Fragment, useState } from "react"
import { PageNationDetail } from "./BoardList.styles"

export default function PaginationUI(props) {
  const [startPage, setStartPage] = useState(1)
  const [clickPage, setClickPage] = useState(1)

  const onClickPage = (event) => {
    props.refetch({ page: Number(event.target.id) }) // variables는 안 써도 된다.
    setClickPage(Number(event.target.id))
  }

  const onClickPrevPage = (event: MouseEvent<HTMLSpanElement>) => {
    if (event.target instanceof Element)
      props.refetch({ search: props.keyword, page: Number(event.target.id) })

    if (startPage === 1) return
    setStartPage((prev) => prev - 10)
    setClickPage(startPage - 10)
    props.refetch({ page: startPage - 10 })
  }

  const onClickNextPage = () => {
    if (startPage + 10 > props.lastPage) return
    setStartPage((prev) => prev + 10)
    setClickPage(startPage + 10)
    props.refetch({ page: startPage + 10 })
  }

  return (
    <Fragment>
      {startPage === 1 || (
        <span
          onClick={onClickPrevPage}
          style={{ cursor: "pointer", fontSize: "large" }}
        >
          {`< 이전`}
        </span>
      )}
      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage > props.lastPage || (
            <PageNationDetail
              clickPage={clickPage}
              startPage={startPage}
              index={index}
              key={index + startPage}
              onClick={onClickPage}
              id={String(index + startPage)}
            >
              {" "}
              {` ${index + startPage} `}{" "}
            </PageNationDetail>
          )
      )}
      {startPage + 10 > props.lastPage || (
        <span
          onClick={onClickNextPage}
          style={{ cursor: "pointer", fontSize: "large" }}
        >
          {`다음 >`}
        </span>
      )}
    </Fragment>
  )
}
