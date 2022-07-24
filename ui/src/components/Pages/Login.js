import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../reducers/userReducer'

import { Center, TextInput, Button } from '@mantine/core'

import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const user = useSelector(({ user }) => user)
    useEffect(() => {
        if (user) {
            navigate('/blogs')
        }
    }, [user])

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(userLogin(username, password, setError))
        setUsername('')
        setPassword('')
    }

    return (
        <Center>
            <form onSubmit={handleLogin}>
                <div>
                    <TextInput
                        id="username"
                        placeholder="Username"
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
                        placeholder="Password"
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
                        Login
                    </Button>
                </Center>
            </form>
        </Center>
    )
}

export default Login
