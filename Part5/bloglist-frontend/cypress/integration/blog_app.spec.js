describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Richard v L',
      username: 'Rich',
      passwordHash: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
  describe('Login', function() {
    it('Successful login', function() {
      cy.get('#usernameLogin').type('Rich')
      cy.get('#passwordLogin').type('test')
      cy.get('#loginbutton').click()
      cy.contains('Richard v L logged in', { timeout: 10000 }) //extended timeout due to high latency
    })
    it('Failed login with wrong credentials', function() {
      cy.get('#usernameLogin').type('Ri')
      cy.get('#passwordLogin').type('test')
      cy.get('#loginbutton').click()

      cy.get('.failure').should('contain', 'Wrong username or password', { timeout: 10000 })
      cy.get('html').should('not.contain', 'Richard v L logged in')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#usernameLogin').type('Rich')
      cy.get('#passwordLogin').type('test')
      cy.get('#loginbutton').click()
      cy.contains('Richard v L logged in', { timeout: 10000 }) //extended timeout due to high latency
    })
    it('Successfully created new blog', function() {
      cy.contains('Create blog').click()
      cy.get('.titleInput').type('Test title')
      cy.get('.authorInput').type('Test author')
      cy.get('.urlInput').type('Test url')
      cy.get('.submitBlogInput').click()
      cy.contains('Test title', { timeout: 10000 })
    })
    describe('When created a post', function() {
      beforeEach(function() {
        cy.contains('Create blog').click()
        cy.get('.titleInput').type('Test title')
        cy.get('.authorInput').type('Test author')
        cy.get('.urlInput').type('Test url')
        cy.get('.submitBlogInput').click()
      })
      it('Successfully liked a post', function() {
        cy.get('.viewDetailsBut').click()
        cy.get('.likeBut').click()
        cy.contains('likes 1', { timeout: 10000 })
      })
      it('Deleted a post', function() {
        cy.get('.viewDetailsBut').click()
        cy.get('#deleteBlog').click()
        cy.get('html').should('not.contain', 'Test title')
      })
    })
  })
})