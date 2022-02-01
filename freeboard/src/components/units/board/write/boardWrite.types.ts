import { ChangeEvent } from "react"

export interface IBoardWriteProps {
  isEdit: boolean
  data?: any
}

export interface IBoardWriteUIProps {
  isActive: boolean
  onClickSubmit: () => void
  onClickMovetoHome: () => void
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void
  isEdit: boolean
  data: any
}

export interface IMyButtonProps {
  isActive: boolean
}
