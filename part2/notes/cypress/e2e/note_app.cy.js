/* eslint-disable linebreak-style */
describe('Note app', function() {
  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    const user = {
      name: "Tunji Job",
      username: "66houdini",
      password: "Oyerinde1$"
    }
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
    cy.visit('')
  })
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it ("login form can be opened", function(){
    cy.contains('login').click()
  })

  it ("user can login", function() {
    cy.contains('login').click()
    cy.get("#username").type("66houdini")
    cy.get("#password").type("Oyerinde1$")
    cy.get("#login-button").click()

    cy.contains("tunji logged in")
  })
  it.only('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get(".error")
      .should("contain", "wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid")

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    cy.contains('Matti Luukkainen logged in').should('not.exist')
  })

  describe("when logged in", function() {
    beforeEach(function() {
      cy.login({ username: "66houdini", password: "Oyerinde1$" })
      cy.createNote({ content: 'first note', important: false })
      cy.createNote({ content: 'second note', important: false })
      cy.contains('login').click()
      cy.get("input:first").type("66houdini")
      cy.get("input:last").type("Oyerinde1$")
      cy.get("#login-button").click()
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "66houdini", password: "Oyerinde1$"
      }).then (response => {
        localStorage.setItem("loggedNoteappUser", JSON.stringify(response.body))
        cy.visit("http://localhost:5173")
      })
    })

    it ("a new note can be created", function() {
      cy.contains("new note").click()
      cy.get("input").type("a note created by cypress")
      cy.contains("save").click()
      cy.contains("a note created by cypress")
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: false
        })
      })

      it('it can be made not important', function () {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()

        cy.contains('another note cypress')
          .contains('make important')
      })

      it ("one of those can be made important", function(){
        cy.contains("second note")
          .contains("make important")
          .click()

        cy.contains("second note")
          .contains("make not important")
        cy.contains("second note").parent().find("button").click()
        cy.contains("second note").parent().find("button")
          .should("contain", "make not important")
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })


  })


})