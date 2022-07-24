import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderContent from './HeaderContent'
import NavigationContent from './NavigationContent'
import Notification from './Notification'

import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Group,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
} from '@mantine/core'

const BurgerHolder = ({ opened, user, theme, setOpened }) => {
    if (user) {
        return (
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                />
            </MediaQuery>
        )
    }
}
const Layout = () => {
    const theme = useMantineTheme()
    const [opened, setOpened] = useState(false)
    const user = useSelector(({ user }) => user)
    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={
                user && (
                    <Navbar
                        p="xl"
                        hiddenBreakpoint="sm"
                        hidden={!opened}
                        width={{ sm: 250, xl: 290 }}
                    >
                        <NavigationContent setOpened={setOpened} />
                    </Navbar>
                )
            }
            footer={
                <Footer height={60} p="md">
                    <Text align="right">
                        Made by&nbsp;
                        <Text
                            variant="link"
                            component="a"
                            href="https://github.com/TomRadford"
                        >
                            Tom Radford
                        </Text>
                        &nbsp;✨
                    </Text>
                </Footer>
            }
            header={
                <Header height={70} p="md">
                    <Group position="apart">
                        <BurgerHolder
                            opened={opened}
                            user={user}
                            theme={theme}
                            setOpened={setOpened}
                        />

                        <HeaderContent />
                    </Group>
                </Header>
            }
        >
            <div>
                <Notification />
                <Outlet />
            </div>
        </AppShell>
    )
}

export default Layout
