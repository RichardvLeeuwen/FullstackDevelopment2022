import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component

  const addBlog = jest.fn()

  beforeEach(() => {
    component = render( <BlogForm addBlog={addBlog}  />   )
  })

  test('Correct details passed on when creating new blog', () => {
    const formBut = component.container.querySelector('.submitBlogInput')
    const titleInput = component.container.querySelector('.titleInput')
    const authorInput = component.container.querySelector('.authorInput')
    const urlInput = component.container.querySelector('.urlInput')
    userEvent.type(titleInput, 'test title')
    userEvent.type(authorInput, 'test author')
    userEvent.type(urlInput, 'test url')
    userEvent.click(formBut)


    expect(addBlog.mock.calls).toHaveLength(1)
    const blog = addBlog.mock.calls[0][0] //I pass on a blog object so need to look inside it
    expect(blog.title).toBe('test title')
    expect(blog.author).toBe('test author')
    expect(blog.url).toBe('test url')
  })
})