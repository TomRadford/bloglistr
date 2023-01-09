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
    Skeleton,
} from '@mantine/core'
import { ThumbUp } from 'tabler-icons-react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import ImageLoader from '../ImageLoader/ImageLoader'

const BlogItem = ({ blog }) => {
    const [likes, setLikes] = useState(blog ? blog.likes : 0)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (blog && likes > blog.likes) {
            dispatch(updateBlog({ ...blog, likes }, navigate))
        }
    }, [likes])

    return (
        <>
            <MediaQuery largerThan="xs" styles={{ width: 340, margin: 'auto' }}>
                <Card shadow="sm" p="lg">
                    {blog ? (
                        <>
                            <Card.Section
                                component={Link}
                                to={`/blogs/${blog.id}`}
                            >
                                {blog.ogImage ? (
                                    <ImageLoader imageUrl={blog.ogImage} />
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
                                    <Text
                                        weight={300}
                                        size="sm"
                                        component="span"
                                    >
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
                                    <Button
                                        variant="light"
                                        color="blue"
                                        fullWidth
                                    >
                                        View
                                    </Button>
                                </Link>
                            </Group>
                        </>
                    ) : (
                        <MediaQuery
                            smallerThan="sm"
                            styles={{ width: 250, margin: 'auto' }}
                        >
                            <div>
                                <Skeleton height={200} width="100%" />
                                <Skeleton height={16} mt={10} radius="xl" />
                                <Skeleton
                                    height={16}
                                    mt={10}
                                    width="30%"
                                    radius="xl"
                                />
                                <Group
                                    position="apart"
                                    align="center"
                                    style={{
                                        marginTop: 5,
                                    }}
                                >
                                    <Skeleton
                                        height={16}
                                        mt={10}
                                        width="20%"
                                        radius="xl"
                                    />
                                    <Skeleton
                                        height={16}
                                        mt={10}
                                        width="15%"
                                        radius="xl"
                                    />
                                    <Skeleton
                                        height={25}
                                        mt={10}
                                        width="30%"
                                        radius="xl"
                                    />
                                </Group>
                            </div>
                        </MediaQuery>
                    )}
                </Card>
            </MediaQuery>
        </>
    )
}

export default BlogItem
