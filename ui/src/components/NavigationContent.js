import { Text } from '@mantine/core'
import { Group, Navbar, Button, MediaQuery } from '@mantine/core'
import { BrandPagekit, Users, NewSection } from 'tabler-icons-react'
import Notification from './Notification'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm/BlogForm'
import Togglable from './Togglable'

const NavigationContent = ({ setOpened }) => {
    return (
        <Group align="center" direction="column">
            <Navbar.Section>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Notification />
                </MediaQuery>
                <Button
                    component={Link}
                    to="/blogs"
                    onClick={() => setOpened(false)}
                    size="md"
                    fullWidth
                    variant="subtle"
                    leftIcon={<BrandPagekit />}
                    mb="md"
                >
                    <Text>Blogs</Text>
                </Button>
                <Button
                    component={Link}
                    to="/users"
                    onClick={() => setOpened(false)}
                    size="md"
                    fullWidth
                    variant="subtle"
                    leftIcon={<Users />}
                    mb="md"
                >
                    <Text>Users</Text>
                </Button>
                <Togglable buttonLabel="New" icon={<NewSection />}>
                    <BlogForm />
                </Togglable>
            </Navbar.Section>
        </Group>
    )
}

export default NavigationContent
