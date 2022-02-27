import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders hidden content only', () => {

  const testUser = {
    username: 'TestUser',
  }
  const newBlog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 10,
    user: {
      username: 'TestUser',
    },
  }


  const updateBlog = jest.fn()
  const delFunc = jest.fn()

  const component = render( <Blog blog={newBlog} updateBlog={updateBlog} user={testUser} delFunc={delFunc} />   )
  //screen.debug()
  const div = component.container.querySelector('.blogWhenHidden')
  screen.debug(div)
  expect(div).toHaveStyle('display: none')
})