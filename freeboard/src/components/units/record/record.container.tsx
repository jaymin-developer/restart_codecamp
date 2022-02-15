import { gql, useQuery } from "@apollo/client"
// import { useRouter } from "next/router";
// import { useEffect } from "react";
import { IQuery } from "../../../commons/types/generated/types"
import { withAuth } from "../../../components/hocs/withAuth"

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
    }
  }
`
const RecordPage = () => {
  // const router = useRouter();
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN)

  return <div>{data?.fetchUserLoggedIn.name}님의 기록</div>
}

export default withAuth(RecordPage)
