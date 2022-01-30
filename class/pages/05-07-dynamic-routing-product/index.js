import axios from "axios";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationProduct() {
  const router = useRouter();

  const [seller, setSeller] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const onChangeSeller = (event) => {
    setSeller(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeDetail = (event) => {
    setDetail(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(Number(event.target.value));
  };

  const onClickSubmit = async () => {
    try {
      const result = await createProduct({
        variables: {
          seller,
          createProductInput: {
            name,
            detail,
            price,
          },
        },
      });
      router.push(
        `/05-08-dynamic-routed-product/${result.data.createProduct._id}`
      );
    } catch (error) {
      console.log(error.message);
    }
    // finally {
    // 실행했든 백엔드에 오류가 있든 할 것들
    // }
  };

  // const onChangeMyWriter = (event) => {
  //     setMyWriter(event.target.value)
  // }

  return (
    <>
      판매자: <input type="text" onChange={onChangeSeller} />
      <br />
      상품명: <input type="text" onChange={onChangeName} />
      <br />
      상품내용: <input type="text" onChange={onChangeDetail} />
      <br />
      상품가격: <input type="text" onChange={onChangePrice} />
      <br />
      {/* <input type="number" /> */}
      <button onClick={onClickSubmit}>상품 등록하기</button>
    </>
  );
}
