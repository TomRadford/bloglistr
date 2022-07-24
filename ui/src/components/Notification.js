import { useSelector } from 'react-redux'
import { Alert } from '@mantine/core'
import { AlertCircle, InfoCircle } from 'tabler-icons-react'

const Notification = ({ className }) => {
    const notificationObject = useSelector(({ notification }) => notification)

    if (notificationObject.message === null) return null

    if (notificationObject.type === 'info')
        return (
            <Alert
                className={className}
                icon={<InfoCircle size={16} />}
                title="Info"
                color="blue"
                mb={10}
            >
                {notificationObject.message}
            </Alert>
        )

    if (notificationObject.type === 'error')
        return (
            <Alert
                className={className}
                icon={<AlertCircle size={16} />}
                title="Error!"
                color="red"
                mb={10}
            >
                {notificationObject.message}
            </Alert>
        )
}

export default Notification
