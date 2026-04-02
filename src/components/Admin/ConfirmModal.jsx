import { Modal, Button } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineExclamation, HiOutlineTrash, HiOutlineCheckCircle } from 'react-icons/hi'

const ConfirmModal = ({ show, onHide, onConfirm, title, message, type = 'danger', icon, confirmText = 'Confirm' }) => {
    
    const getIcon = () => {
        if (icon) return icon
        switch (type) {
            case 'danger': return <HiOutlineTrash size={40} className="text-danger" />
            case 'success': return <HiOutlineCheckCircle size={40} className="text-success" />
            default: return <HiOutlineExclamation size={40} className="text-warning" />
        }
    }

    const getBtnVariant = () => {
        switch (type) {
            case 'danger': return 'danger'
            case 'success': return 'success'
            default: return 'primary'
        }
    }

    return (
        <Modal 
            show={show} 
            onHide={onHide} 
            centered 
            className="glass-modal confirm-modal"
            backdrop="static"
        >
            <Modal.Body className="p-4 p-md-5 text-center">
                <AnimatePresence>
                    {show && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="d-flex flex-column align-items-center"
                        >
                            <div className={`bg-${type} bg-opacity-10 p-4 rounded-circle mb-4`}>
                                {getIcon()}
                            </div>
                            
                            <h3 className="fw-extrabold mb-3 text-dark">{title || 'Are you sure?'}</h3>
                            <p className="text-secondary fw-medium lead mb-4 fs-6">
                                {message || 'This action cannot be undone. Please confirm you wish to proceed.'}
                            </p>

                            <div className="d-flex gap-3 w-100 justify-content-center">
                                <Button 
                                    variant="light" 
                                    onClick={onHide}
                                    className="rounded-pill px-4 py-2 fw-bold text-secondary border-0"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    variant={getBtnVariant()} 
                                    onClick={() => {
                                        onConfirm()
                                        onHide()
                                    }}
                                    className="rounded-pill px-4 py-2 fw-bold shadow-lg shadow-opacity-25"
                                >
                                    {confirmText}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmModal
