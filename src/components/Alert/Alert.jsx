import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { motion } from 'motion/react'
import { removeAlert } from '../../redux/uiSlice'
import {
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiOutlineInformationCircle,
    HiOutlineXCircle,
    HiOutlineX
} from 'react-icons/hi'
import './Alert.css'

const icons = {
    success: <HiOutlineCheckCircle />,
    error: <HiOutlineXCircle />,
    warning: <HiOutlineExclamationCircle />,
    info: <HiOutlineInformationCircle />,
}

const Alert = ({ alert }) => {
    const dispatch = useDispatch()
    const { id, type, title, message, duration } = alert

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeAlert(id))
        }, duration)

        return () => clearTimeout(timer)
    }, [dispatch, id, duration])

    const handleClose = () => {
        dispatch(removeAlert(id))
    }

    return (
        <motion.div
            className={`sv-alert sv-alert--${type}`}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95, transition: { duration: 0.2 } }}
            layout
        >
            <div className="sv-alert__icon">
                {icons[type]}
            </div>
            <div className="sv-alert__body">
                {title && <div className="sv-alert__title">{title}</div>}
                <div className="sv-alert__message">{message}</div>
            </div>
            <button className="sv-alert__close" onClick={handleClose}>
                <HiOutlineX size={18} />
            </button>

            <div className="sv-alert__progress">
                <motion.div
                    className="sv-alert__progress-fill"
                    style={{ color: 'inherit' }}
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                />
            </div>
        </motion.div>
    )
}

export default Alert
