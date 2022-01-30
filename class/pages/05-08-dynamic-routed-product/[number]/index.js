import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

export default function DynamicRoutedPage() {
  const router = useRouter();

  const FETCH_PRODUCT = gql`
    query fetchProduct($productId: ID) {
      fetchProduct(productId: $productId) {
        _id
        seller
        name
        detail
        price
      }
    }
  `;

  const { data } = useQuery(FETCH_PRODUCT, {
    variables: { productId: router.query.number },
    // 저장된 정보를 입력해야함
  });

  return (
    <>
      <div>판매자 : {data?.fetchProduct.seller}</div>
      <div>상품명 : {data?.fetchProduct.name}</div>
      <div>상품설명: {data?.fetchProduct.detail}</div>
      <div>상품가격: {data?.fetchProduct.price}</div>
    </>
  );
}
