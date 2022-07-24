const { default: blogs } = require('../../src/services/blogs')

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({
            username: 'tom',
            name: 'Tom',
            password: '1234',
        })
    })
    it('login form is shown', function () {
        cy.contains('log in to application')
    })
    describe('login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('tom')
            cy.get('#password').type('1234')
            cy.get('#login-button').click()
            cy.contains('Tom is logged in')
        })
        it('fails with wrong credentials', function () {
            cy.get('#username').type('to2m')
            cy.get('#password').type('12344')
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain', 'Incorrect username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'tom', password: '1234' })
        })
        it.only('a blog can be created', function () {
            cy.contains('new note').click()
            cy.get('#title').type('Test blog by cypress')
            cy.get('#author').type('Author Author')
            cy.get('#url').type('https://google.com')
            cy.contains('create').click()
            cy.contains('Test blog by cypress')
            cy.get('.blog').should('contain', 'Test blog by cypress')
        })
        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Cypress docs are great',
                    url: 'https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-is-Not-Like-jQuery',
                    author: 'Cypress',
                })
                cy.visit('http://localhost:3000/')
            })
            it('user can like a blog', function () {
                cy.contains('view').click()
                cy.contains('likes 0')
                cy.get('#like-button').click()
                cy.contains('likes 1')
            })
            it('user can delete their own blog', function () {
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.contains('Cypress docs are great').should('not.exist')
            })
            describe('another user', function () {
                beforeEach(function () {
                    cy.logout()
                    cy.createUser({
                        username: 'jan',
                        name: 'Jan',
                        password: '5050',
                    })
                    cy.login({
                        username: 'jan',
                        password: '5050',
                    })
                })
                it('cant delete the blog', function () {
                    cy.contains('view').click()
                    cy.contains('remove').should('not.exist')
                })
            })
        })
        describe('and many blogs exist', function () {
            beforeEach(function () {
                const blogs = [
                    {
                        title: 'Cypress docs are great',
                        url: 'https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-is-Not-Like-jQuery',
                        author: 'Cypress',
                        likes: 3,
                    },
                    {
                        title: 'Go To Statement Considered Harmful',
                        author: 'Edsger W. Dijkstra',
                        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                        likes: 5,
                    },
                    {
                        title: 'Canonical string reduction',
                        author: 'Edsger W. Dijkstra',
                        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                        likes: 12,
                    },
                    {
                        title: 'First class tests',
                        author: 'Robert C. Martin',
                        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                        likes: 10,
                    },
                    {
                        title: 'Type wars',
                        author: 'Robert C. Martin',
                        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                        likes: 2,
                    },
                ]

                blogs.forEach((blog) => cy.createBlog(blog))

                cy.visit('http://localhost:3000/')
            })
            it('blogs are ordered according to likes', function () {
                let previousLikes
                for (let i = 0; i < 5; i++) {
                    cy.get('.blog').eq(i).as('blogDiv')
                    cy.get('@blogDiv').find('button').eq(0).click()
                    cy.get('@blogDiv')
                        .find('#likes')
                        .should((value) => {
                            let likes = parseInt(value[0].innerText)
                            console.log(likes)
                            if (i !== 0) {
                                expect(likes).to.be.lessThan(previousLikes)
                            }
                            previousLikes = likes
                        })
                }
            })
            it('blogs are ordered correctly after likes button is clicked', function () {
                for (let i = 0; i < 5; i++) {
                    cy.get('.blog').eq(i).as('blogDiv')
                    cy.get('@blogDiv').find('button').eq(0).click()
                }

                cy.get('.blog').eq(1).find('button').eq(2).as('likeButtonOne')
                cy.get('.blog').eq(3).find('button').eq(2).as('likeButtonTwo')
                cy.get('.blog').eq(3).find('button').eq(2).as('likeButtonThree')

                for (let i = 0; i < 13; i++) {
                    cy.get('@likeButtonOne').click()
                }

                for (let i = 0; i < 18; i++) {
                    cy.get('@likeButtonTwo').click()
                }

                for (let i = 0; i < 7; i++) {
                    cy.get('@likeButtonThree').click()
                }

                let previousLikes
                for (let i = 0; i < 5; i++) {
                    cy.get('.blog').eq(i).as('blogDiv')
                    cy.get('@blogDiv')
                        .find('#likes')
                        .should((value) => {
                            let likes = parseInt(value[0].innerText)
                            console.log(likes)
                            if (i !== 0) {
                                expect(likes).to.be.lessThan(previousLikes)
                            }
                            previousLikes = likes
                        })
                }
            })
        })
    })
})
