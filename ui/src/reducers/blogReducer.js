import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'
import { userLogout } from './userReducer'

const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => {
        return b.likes - a.likes
    })
}

const handleError = (dispatch, exception, navigate) => {
    if (exception.response.data.error === 'Provided token has expired') {
        dispatch(
            setNotification(
                {
                    message: 'User session has expired, please login again.',
                    type: 'error',
                },
                2000
            )
        )
        dispatch(userLogout())
        navigate('/')
    } else {
        dispatch(
            setNotification(
                {
                    message: 'Failed to create new blog post',
                    type: 'error',
                },
                2000
            )
        )
    }
}

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return sortBlogs(action.payload)
        },
        updateBlogs(state, action) {
            const newBlog = action.payload
            const newBlogs = state.map((blog) =>
                blog.id === newBlog.id ? newBlog : blog
            )
            return sortBlogs(newBlogs)
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        removeBlog(state, action) {
            const blogToRemove = action.payload
            return state.filter((blog) => blogToRemove.id !== blog.id)
        },
    },
})

export const { setBlogs, appendBlog, removeBlog, updateBlogs } =
    blogSlice.actions

export const initializeBlogs = () => {
    return async (dispath) => {
        const res = await blogService.getAll()
        const blogs = res.data
        dispath(setBlogs(blogs))
    }
}

export const createBlog = (blogObject, navigate, setLoading) => {
    return async (dispatch) => {
        try {
            setLoading(true)
            const res = await blogService.create(blogObject)
            const newBlog = res.data
            dispatch(appendBlog(newBlog))
            dispatch(
                setNotification(
                    {
                        message: `a new blog ${newBlog.title} by ${newBlog.author} has been added`,
                        type: 'info',
                    },
                    2000
                )
            )
            setLoading(false)
        } catch (exception) {
            handleError(dispatch, exception, navigate)
            setLoading(false)
        }
    }
}

export const deleteBlog = (blogObject, navigate) => {
    return async (dispatch) => {
        try {
            await blogService.remove(blogObject)
            dispatch(removeBlog(blogObject))
        } catch (exception) {
            handleError(dispatch, exception, navigate)
        }
    }
}

export const updateBlog = (blogObject, navigate) => {
    return async (dispatch) => {
        try {
            await blogService.update(blogObject)
            dispatch(updateBlogs(blogObject))
        } catch (exception) {
            handleError(dispatch, exception, navigate)
        }
    }
}

export default blogSlice.reducer
