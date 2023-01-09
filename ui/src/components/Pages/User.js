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
    Skeleton,
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

    return (
        <>
            {!user ? (
                <>
                    <Center>
                        <Skeleton height={20} width={350} radius="xl" />
                    </Center>
                    <Center>
                        <Skeleton
                            height={12}
                            width={100}
                            mt={10}
                            mb={20}
                            radius="xl"
                        />
                    </Center>
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
                            {[...new Array(6)].map((v, i) => (
                                <BlogItem key={i} />
                            ))}
                        </SimpleGrid>
                    </Center>
                </>
            ) : (
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
            )}
        </>
    )
}

export default User
