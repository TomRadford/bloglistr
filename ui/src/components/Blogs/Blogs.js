import { useSelector } from 'react-redux'
import BlogItem from './BlogItem'
import { SimpleGrid, Center } from '@mantine/core'

const Blogs = () => {
    const blogs = useSelector(({ blogs }) => blogs)

    return (
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
                {blogs.map((blog) => (
                    <BlogItem key={blog.id} blog={blog} />
                ))}
            </SimpleGrid>
        </Center>
    )
}

export default Blogs
