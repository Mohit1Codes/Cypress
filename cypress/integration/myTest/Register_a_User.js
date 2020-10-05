import data from '../shared-data/TestData'

describe('Register a user', ()=>{

    beforeEach(()=>{

        let b = data()

        cy.visit(b.url)
        cy.get('a[href="/login"]').click()
    })
    

it('create new user verify', ()=>{

    let c = data()
    
    cy.url().should('include', '/login')
    cy.get('a[href="/signup"]').click()
    cy.url().should('include','/signup')

    cy.create_new_user(c.newEmail1, 'qwerty')

    cy.get('.alert.alert-notice').should('be.visible')
    .should('contain.text', 'Welcome! You have signed up successfully.')

    cy.get('a[href*="logout"]').click()

    cy.get('.alert.alert-notice').should('be.visible')
    .should('contain.text', 'Signed out successfully.')


})

it('create new user existing email', ()=>{

    let d = data()
    
    cy.url().should('include', '/login')
    cy.get('a[href="/signup"]').click()
    cy.url().should('include','/signup')

    cy.create_new_user(d.newEmail1, 'qwerty')


    cy.get('#errorExplanation').should('be.visible')
    .within(()=>{

        cy.contains('Email has already been taken')
    })


})

it('create new user invalid email', ()=>{
    
    cy.url().should('include', '/login')
    cy.get('a[href="/signup"]').click()
    cy.url().should('include','/signup')

    cy.create_new_user('navin@gmail', 'qwerty')


    cy.get('#errorExplanation').should('be.visible')
    .within(()=>{

        cy.contains('Email is invalid')
    })


})


it('create new user short password', ()=>{
    
    cy.url().should('include', '/login')
    cy.get('a[href="/signup"]').click()
    cy.url().should('include','/signup')

    cy.create_new_user('navo@gmail.com', 'qwert')

    cy.get('#errorExplanation').should('be.visible')
    .within(()=>{

        cy.contains('Password is too short (minimum is 6 characters)')
    })

})
})