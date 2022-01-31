import { ChangeEvent } from "react";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: any;
  // data 라고 하면 new에는 data를 안 주고 edit에는 data를 주기 때문에 ?를 넣어서 해결하자
}

export interface IBoardWriteUIProps {
  bbb: string;
  ccc: () => void;
  xxx: () => void;
  ddd: (event: ChangeEvent<HTMLInputElement>) => void;
  eee: (event: ChangeEvent<HTMLInputElement>) => void;
  fff: (event: ChangeEvent<HTMLInputElement>) => void;
  // => 뒤에는 return되는 타입, 없으면 void
  isActive: boolean;
  isEdit: boolean;
  data: any;
}

export interface IMyButtonProps {
    isActive: boolean;
  }