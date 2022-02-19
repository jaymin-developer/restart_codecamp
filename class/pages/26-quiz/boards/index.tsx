import { gql, useQuery } from "@apollo/client"
import { IBoard } from "../../../src/commons/types/generated/types"
import PickItems from "../../../src/components/units/pickItem/pickItems"

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
    }
  }
`

export default function BasketPage() {
  const { data } = useQuery(FETCH_BOARDS)
  return (
    <div>
      {data?.fetchBoards.map((el: IBoard) => (
        <PickItems key={el._id} el={el}></PickItems>
      ))}
    </div>
  )
}
