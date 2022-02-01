import { useState } from "react"
import { Modal } from "antd"
import DaumPostcode from "react-daum-postcode"

export default function ModalAddressPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [, setAddress] = useState("")
  const [, setZonecode] = useState()

  // const showModal = () => {
  //   setIsModalVisible((prev) => !prev)
  // }

  // const handleOk = () => {
  //   setIsModalVisible((prev) => !prev)
  // }

  // const handleCancel = () => {
  //   setIsModalVisible((prev) => !prev)
  // }

  const onToggleModal = () => {
    setIsModalVisible((prev) => !prev)
  }

  const onCompleteDaumPostcode = (data: any) => {
    console.log(data)
    setAddress(data.address)
    setZonecode(data.zoncode)
    onToggleModal()
  }

  return (
    <>
      <button onClick={onToggleModal}>우편번호 검색</button>
      {isModalVisible && (
        <Modal visible={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcode onComplete={onCompleteDaumPostcode} />
        </Modal>
      )}
    </>
  )
}
// state 다시 그려지면서 초기화가 된다.
