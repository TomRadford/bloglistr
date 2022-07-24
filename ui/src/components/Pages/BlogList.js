import Blogs from '../Blogs/Blogs'
import { Title } from '@mantine/core'

const BlogList = () => {
    return (
        <>
            <Title order={2} mb={4} align="center">
                Popular blog posts
            </Title>

            <div style={{ marginTop: 30 }}>
                <Blogs />
            </div>
        </>
    )
}
export default BlogList
