import { ChangeEvent } from "react"

export interface IBoardWriteProps {
  isEdit: boolean
  data?: any
}

export interface IBoardWriteUIProps {
  SubmitButton: { children: string; isActive: boolean; onClick: () => void }
  onClickSubmit: () => void
  onClickMovetoHome: () => void
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void
  isActive: boolean
  isEdit: boolean
  data: any
}

// export interface IMyButtonProps {
//   isActive: boolean
// }
