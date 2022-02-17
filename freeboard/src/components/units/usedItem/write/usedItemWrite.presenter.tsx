import UploadButtons from "../../../commons/imageUpload"
import * as S from "./usedItemWrite.styles"
import Input01 from "../../../commons/inputs/01/inputs01"

export default function UsedItemWriteUI(props) {
  return (
    <S.Wrapper>
      <form onSubmit={props.handleSubmit(props.onClickSubmit)}>
        <S.WrapperHead>
          <S.CancelButton type="button" onClick={props.onClickMovetoUseditem}>
            취소
          </S.CancelButton>
          <S.WrapperTitle>
            {props.isEdit ? "상품 수정" : "상품 등록"}
          </S.WrapperTitle>
          <S.SubmitButton
            isEdit={props.isEdit}
            isActive={props.isActive}
            // onClick={props.isEdit && props.onClickUpdate}
          >
            {props.isEdit ? "수정" : "등록"}
          </S.SubmitButton>
        </S.WrapperHead>
        <S.WrapperBody>
          <S.WrapperBodyHead>
            <S.ItemName>
              <Input01
                type="text"
                placeholder="도서명을 입력해주세요"
                register={props.register("name")}
                //   onChange={props.onChangeWriter}
                //   defaultValue={props.data?.fetchBoard.writer}
                //   readOnly={!!props.data?.fetchBoard.writer}
              ></Input01>
              <div style={{ color: "red", fontSize: "14px" }}>
                {props.formState.errors.UsedItem?.message}
              </div>
            </S.ItemName>
            <S.ItemPrice>
              <Input01
                type="number"
                placeholder="판매 가격을 입력해주세요."
                onChange={props.onChangePassword}
                register={props.register("price")}
              ></Input01>
              <div style={{ color: "red", fontSize: "14px" }}>
                {props.formState.errors.ItemPrice?.message}
              </div>
            </S.ItemPrice>
          </S.WrapperBodyHead>
          <S.WrapperBodyBody>
            <Input01
              type="text"
              placeholder="한 줄 도서평을 입력해주세요"
              onChange={props.onChangeReview}
              defaultValue={props.data?.fetchBoard.title}
              register={props.register("remarks")}
            />
            <div style={{ color: "red" }}>
              {props.formState.errors.Review?.message}
            </div>
            <S.Contents
              placeholder="도서를 설명해주세요"
              onChange={props.onChangeContents}
              {...props.register("contents")}
              defaultValue={props.data?.fetchBoard.contents}
            />
            <Input01
              type="text"
              placeholder="태그를 입력해주세요(예시 : #태그)"
              onChange={props.onChangeTitle}
              defaultValue={props.data?.fetchBoard.title}
            />
            <div style={{ color: "red", fontSize: "14px" }}>
              {props.formState.errors.Contents?.message}
            </div>
          </S.WrapperBodyBody>
        </S.WrapperBody>
        <S.WrapperFoot>
          <S.Location>
            <S.LocationLeft>
              거래위치
              <div
                style={{
                  backgroundColor: "black",
                  maxWidth: "90%",
                  minHeight: "90%",
                }}
              ></div>
            </S.LocationLeft>
            <S.LocationRight>
              <div>GPS</div>
              <div>
                <button type="button">위도(LAT)</button>
                <button type="button">경도(LNG)</button>
              </div>
              <div>주소</div>
              <Input01 />
              <div></div>
              <Input01 />
            </S.LocationRight>
          </S.Location>
          <S.ImageUpload>
            <UploadButtons
              onChangeFile={props.onChangeFile}
              images={props.images}
            />
          </S.ImageUpload>
          <S.MainImage>
            <div>메인 사진 설정</div>
            <div>
              <label>
                <input type="radio" name="main" />
                <span> 사진 1</span>
              </label>
              <label>
                <input type="radio" name="main" />
                <span> 사진 2</span>
              </label>
            </div>
          </S.MainImage>
        </S.WrapperFoot>
      </form>
    </S.Wrapper>
  )
}
