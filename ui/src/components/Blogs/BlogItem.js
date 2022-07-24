import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    MediaQuery,
} from '@mantine/core'
import { ThumbUp } from 'tabler-icons-react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const BlogItem = ({ blog }) => {
    const [likes, setLikes] = useState(blog.likes)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (likes > blog.likes) {
            dispatch(updateBlog({ ...blog, likes }, navigate))
        }
    }, [likes])

    return (
        <>
            <MediaQuery largerThan="xs" styles={{ width: 340, margin: 'auto' }}>
                <Card shadow="sm" p="lg">
                    <Card.Section component={Link} to={`/blogs/${blog.id}`}>
                        {blog.ogImage ? (
                            <Image src={blog.ogImage} />
                        ) : (
                            <Image withPlaceholder height={200} />
                        )}
                    </Card.Section>
                    <Group
                        position="apart"
                        align="center"
                        style={{
                            marginTop: 5,
                        }}
                    >
                        <Text weight={500}>
                            {blog.title}{' '}
                            <Text weight={300} size="sm" component="span">
                                by {blog.author}
                            </Text>
                        </Text>
                        {blog.user.name && (
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
                        )}
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
                            to={`/blogs/${blog.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button variant="light" color="blue" fullWidth>
                                View
                            </Button>
                        </Link>
                    </Group>
                </Card>
            </MediaQuery>
        </>
    )
}

export default BlogItem
