import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Container,
    Text,
    Title,
    Image,
    Code,
    Badge,
    Group,
    Button,
    Paper,
    Textarea,
} from '@mantine/core'
import { ThumbUp } from 'tabler-icons-react'
import blogService from '../../services/blogs'

import { userLogout } from '../../reducers/userReducer'
import { deleteBlog, updateBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const Blog = () => {
    const { blogId } = useParams()
    const [blog, setBlog] = useState(null)
    const [likes, setLikes] = useState(0)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        blogService.getBlog(blogId).then(({ data }) => {
            setBlog({ ...data, comments: sortComments(data.comments) })
            setLikes(data.likes)
        })
    }, [])

    useEffect(() => {
        if (blog) {
            if (likes > blog.likes) {
                dispatch(updateBlog({ ...blog, likes }, navigate))
            }
        }
    }, [likes])

    const handleDeleteBlog = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog, navigate))
        }
        navigate('/blogs')
        dispatch(
            setNotification(
                {
                    message: `${blog.title} by ${blog.author} has been deleted`,
                    type: 'info',
                },
                2000
            )
        )
    }

    const handleComment = async (e) => {
        e.preventDefault()
        try {
            const comment = {
                message: e.target.message.value,
            }
            const res = await blogService.createComment(blog.id, comment)
            const newComment = res.data
            e.target.message.value = ''
            setBlog({
                ...blog,
                comments: sortComments(blog.comments.concat(newComment)),
            })
        } catch (exception) {
            dispatch(userLogout())
            navigate('/')
            dispatch(
                setNotification(
                    {
                        message:
                            'User session has expired, please login again.',
                        type: 'error',
                    },
                    2000
                )
            )
        }
    }

    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }

    const getDate = (date) => {
        const dateObj = new Date(date)
        return dateObj.toLocaleString('en-GB', options)
    }

    const sortComments = (comments) => {
        return comments.sort((a, b) => {
            a.date = new Date(a.createdAt)
            b.date = new Date(b.createdAt)
            return b.date - a.date
        })
    }

    if (!blog) return null
    return (
        <Container>
            {blog.ogImage ? (
                <Image radius="md" src={blog.ogImage} />
            ) : (
                <Image radius="md" withPlaceholder height={200} />
            )}

            <Title order={1}>{blog.title}</Title>

            <Group position="apart" m={10}>
                <Text weight={300} size="sm" component="span">
                    by {blog.author}
                </Text>
                <Badge
                    style={{
                        cursor: 'pointer',
                    }}
                    color="orange"
                    variant="light"
                    onClick={() => setLikes(likes + 1)}
                >
                    <Group position="center">
                        <ThumbUp size={12} />
                        <Text size="xs">{likes}</Text>
                    </Group>
                </Badge>
                <Link
                    style={{ textDecoration: 'none' }}
                    to={`/users/${blog.user.id}`}
                >
                    <Badge
                        style={{
                            cursor: 'pointer',
                        }}
                        color="green"
                        variant="light"
                    >
                        {blog.user.name}
                    </Badge>
                </Link>
            </Group>

            <Code m={10} style={{ display: 'block' }}>
                <a href={blog.url}>{blog.url}</a>
            </Code>

            <Group position="right">
                <Button variant="subtle" color="red" onClick={handleDeleteBlog}>
                    Delete
                </Button>
            </Group>

            <Title order={3} align="center" m={5}>
                Comments
            </Title>
            <form onSubmit={handleComment}>
                <Textarea
                    id="message"
                    placeholder="Comment"
                    autosize
                    minRows={2}
                    required
                />
                <Button
                    fullWidth
                    m={10}
                    variant="subtle"
                    color="dark"
                    type="submit"
                >
                    Add comment
                </Button>
            </form>
            <Group position="center">
                {blog.comments.map((comment) => (
                    <Paper
                        style={{ width: '70%' }}
                        mb={15}
                        shadow="xs"
                        p="lg"
                        key={comment.id}
                    >
                        <Text>{comment.message}</Text>
                        <Text align="right" size="xs" color="dimmed">
                            {getDate(comment.createdAt)}
                        </Text>
                    </Paper>
                ))}
            </Group>
        </Container>
    )
}
export default Blog
