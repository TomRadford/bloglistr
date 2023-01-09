import { useState, useEffect } from 'react'
import userService from '../../services/users'
import { Link } from 'react-router-dom'
import { Container, Center, Title, Table, Text, Skeleton } from '@mantine/core'

const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then((res) => {
            setUsers(res.data)
        })
    }, [])

    return (
        <Container>
            <Title align="center" order={1}>
                Users
            </Title>
            {users.length === 0 ? (
                <div style={{ marginTop: '20px' }}>
                    {[...new Array(10)].map((v, i) => (
                        <Skeleton height={16} key={i} mb={10} />
                    ))}
                </div>
            ) : (
                <Table mt={8}>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        <Text>{user.name}</Text>
                                    </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    )
}

export default UserList
