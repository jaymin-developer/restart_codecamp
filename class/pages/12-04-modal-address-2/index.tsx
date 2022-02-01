import { useState } from "react"
import { Modal } from "antd"
import DaumPostcode from "react-daum-postcode"

export default function ModalAddressPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [, setAddress] = useState("")
  const [, setZonecode] = useState()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onCompleteDaumPostcode = (data: any) => {
    console.log(data)
    setAddress(data.address)
    setZonecode(data.zoncode)
    setIsModalVisible(false)
  }

  return (
    <>
      <button onClick={showModal}>우편번호 검색</button>
      {isModalVisible && (
        <Modal visible={true} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcode onComplete={onCompleteDaumPostcode} />
        </Modal>
      )}
    </>
  )
}
// state 다시 그려지면서 초기화가 된다.
