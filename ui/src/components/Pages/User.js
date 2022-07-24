import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../../services/users'
import { Link } from 'react-router-dom'
import {
    Container,
    Center,
    Title,
    Table,
    Text,
    SimpleGrid,
} from '@mantine/core'
import BlogItem from '../Blogs/BlogItem'

const User = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    useEffect(() => {
        userService.getUser(userId).then((res) => {
            setUser(res.data)
        })
    }, [])
    if (!user) return null
    return (
        <>
            <Title align="center" order={1}>
                {user.name}
            </Title>
            <Title align="center" order={3} mb={8}>
                Added blogs
            </Title>
            <Center>
                <SimpleGrid
                    cols={2}
                    breakpoints={[
                        { maxWidth: 'md', cols: 1, spacing: 'sm' },
                        { maxWidth: 'lg', cols: 2, spacing: 'lg' },
                        { minWidth: 1400, cols: 3, spacing: 'xl' },
                        { minWidth: 2000, cols: 4, spacing: 'xl' },
                    ]}
                >
                    {user.blogs.map((blog) => (
                        <BlogItem key={blog.id} blog={blog} />
                    ))}
                </SimpleGrid>
            </Center>
        </>
    )
}

export default User
