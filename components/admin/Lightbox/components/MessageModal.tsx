import styles from '../Lightbox.module.scss'
import Button from '../../../ui/Button'

const MessageModal = ({
  message,
  setShowProtectedMessage,
  setProtectedMessage,
}: {
  message: string
  setShowProtectedMessage: React.Dispatch<React.SetStateAction<boolean>>
  setProtectedMessage: React.Dispatch<React.SetStateAction<string>>
}) => {
  const handleClose = () => {
    setShowProtectedMessage(false)
    setProtectedMessage('')
  }

  return (
    <dialog className={styles.messageModal}>
      <p>{message}</p>
      <Button text="OK" title="OK" onClick={handleClose} />
    </dialog>
  )
}

export default MessageModal
