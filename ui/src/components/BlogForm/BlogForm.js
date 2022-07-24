import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createBlog } from '../../reducers/blogReducer'
import { Group, Button, Title, TextInput } from '@mantine/core'

const BlogForm = () => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNewBlog = (event) => {
        event.preventDefault()
        const blog = {
            title,
            author,
            url,
        }
        dispatch(createBlog(blog, navigate, setLoading))
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <>
            <Title order={3} align="center">
                Add a blog
            </Title>
            <form onSubmit={handleNewBlog}>
                <TextInput
                    name="Title"
                    id="title"
                    value={title}
                    placeholder="Title"
                    m={5}
                    onChange={({ target }) => setTitle(target.value)}
                />
                <TextInput
                    id="author"
                    name="Author"
                    value={author}
                    placeholder="Author"
                    m={5}
                    onChange={({ target }) => setAuthor(target.value)}
                />
                <TextInput
                    id="url"
                    name="Url"
                    value={url}
                    placeholder="URL"
                    m={5}
                    onChange={({ target }) => setUrl(target.value)}
                />
                <Group position="center" m={5}>
                    <Button
                        loaderPosition="right"
                        type="submit"
                        loading={loading}
                    >
                        Create
                    </Button>
                </Group>
            </form>
        </>
    )
}

export default BlogForm
