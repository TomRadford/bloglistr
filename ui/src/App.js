import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Layout from './components/Layout'
import Login from './components/Pages/Login'
import BlogList from './components/Pages/BlogList'
import Blog from './components/Pages/Blog'
import UserList from './components/Pages/UserList'
import User from './components/Pages/User'

import { MantineProvider } from '@mantine/core'

import { initializeBlogs, setBlogs } from './reducers/blogReducer'
import { restoreUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const userLocalStorage =
            window.localStorage.getItem('loggedBlogAppUser')
        if (userLocalStorage) {
            dispatch(restoreUser(JSON.parse(userLocalStorage)))
            dispatch(initializeBlogs())
        } else {
            if (window.location.pathname !== '/') {
                dispatch(setBlogs([]))
                navigate('/')
                dispatch(
                    setNotification(
                        {
                            message: 'Please login to continue',
                            type: 'error',
                        },
                        2000
                    )
                )
            }
        }
    }, [])

    return (
        <MantineProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path="blogs" element={<BlogList />} />
                    <Route path="blogs/:blogId" element={<Blog />} />
                    <Route path="users" element={<UserList />} />
                    <Route path="users/:userId" element={<User />} />
                    <Route path="*" element={<div>404</div>} />
                </Route>
            </Routes>
        </MantineProvider>
    )
}

export default App
