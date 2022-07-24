import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('New blog submit calls event handler with the correct details', async () => {
    const newBlog = {
        title: 'test blog',
        author: 'test author',
        url: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16',
    }
    const mockHandler = jest.fn()
    const container = render(<BlogForm createBlog={mockHandler} />)
    const user = userEvent.setup()
    const inputs = container.getAllByRole('textbox')
    await user.type(inputs[0], newBlog.title)
    await user.type(inputs[1], newBlog.author)
    await user.type(inputs[2], newBlog.url)
    const submit = container.getByText('create')
    await user.click(submit)
    expect(mockHandler.mock.calls[0][0]).toEqual(newBlog)
})
