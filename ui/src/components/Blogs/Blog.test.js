import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container, blog, user, mockHandler

    beforeEach(() => {
        blog = {
            title: 'Test blog',
            author: 'Test author',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 55,
            user: {
                username: 'tom',
            },
        }
        user = {
            name: 'Tom',
            username: 'tom',
        }
        mockHandler = jest.fn()
        container = render(
            <Blog blog={blog} user={user} setBlogs={mockHandler} blogs={[]} />
        ).container
    })

    test('Component renders only title and author by default', () => {
        const element = container.querySelector('.blogDetails')
        expect(element).toHaveTextContent(`${blog.title} ${blog.author}`)
        const blogInfo = container.querySelector('.blogInfo')
        expect(blogInfo).toHaveStyle('display: none')
    })

    test('Blog url and number of likes are shown when the button controlling the show details has been clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const div = container.querySelector('.blogInfo')
        expect(div).not.toHaveStyle('display: none')
    })

    test('Make sure if like button is clicked twice, the event handler is called twice', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
