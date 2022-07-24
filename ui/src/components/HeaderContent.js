import { userLogout, userCreate } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
    Title,
    Text,
    Button,
    Modal,
    TextInput,
    Center,
    MediaQuery,
} from '@mantine/core'
import { useState } from 'react'
import Notification from './Notification'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const HeaderContent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(userLogout())
        navigate('/')
    }
    const user = useSelector(({ user }) => user)
    const handleSignup = async (event) => {
        event.preventDefault()
        dispatch(
            userCreate(username, password, name, setError, setShowRegister)
        )
        setUsername('')
        setPassword('')
        setName('')
    }
    return (
        <>
            <Link
                to="/blogs"
                style={{ textDecoration: 'none', color: 'black' }}
            >
                <Title order={3} align="center">
                    &#127760; BlogListr
                </Title>
            </Link>
            <Text style={{ display: 'flex', alignItems: 'center' }} size="sm">
                {user ? (
                    <>
                        <MediaQuery
                            smallerThan="sm"
                            styles={{ display: 'none' }}
                        >
                            <Text mr={5}>
                                Hi <b>{user.name}</b>!
                            </Text>
                        </MediaQuery>
                        <Button
                            type="submit"
                            variant="subtle"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={() => setShowRegister(true)}
                        variant="subtle"
                    >
                        Sign up
                    </Button>
                )}
            </Text>
            <Modal
                opened={showRegister}
                onClose={() => setShowRegister(false)}
                title="Join the blog listing revolution!"
            >
                <Notification />
                <form onSubmit={handleSignup}>
                    <div>
                        <TextInput
                            id="name"
                            placeholder="Luke Skywalker"
                            label="Full name"
                            required
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                            error={error}
                        />
                    </div>
                    <div>
                        <TextInput
                            id="username"
                            placeholder="BlogMaster021"
                            label="Username"
                            required
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                            error={error}
                        />
                    </div>
                    <div>
                        <TextInput
                            id="password"
                            placeholder="sUperKriptIk"
                            label="Password"
                            required
                            value={password}
                            type="password"
                            onChange={({ target }) => setPassword(target.value)}
                            error={error}
                        />
                    </div>
                    <Center mt={10}>
                        <Button type="submit" variant="subtle">
                            Register
                        </Button>
                    </Center>
                </form>
            </Modal>
        </>
    )
}

export default HeaderContent
