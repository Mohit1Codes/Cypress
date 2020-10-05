
Cypress.Commands.add('create_new_user', (email, password)=>{

    cy.get('#spree_user_email').type(email)
    cy.get('#spree_user_password').type(password)
    cy.get('#spree_user_password_confirmation').type(password)
    cy.get('input[value="Create"]').click()

})


Cypress.Commands.add('search', (item)=>{

    cy.get('input#keywords').type(item)
    cy.get('input[value="Search"]').click()

})


Cypress.Commands.add('billing_address', 
(firstname, lastname, address1, address2, country, state, city, zipcode, phone)=>{

    cy.get('p[id="bfirstname"] input').type(firstname)
    cy.get('p[id="blastname"] input').type(lastname)
    cy.get('p[id="baddress1"] input').type(address1)
    cy.get('p[id="baddress2"] input').type(address2)
    cy.get('p[id="bcountry"] select').select(country)  
    cy.get('p[id="bstate"] select').select(state) 
    cy.get('p[id="bcity"] input').type(city)
    cy.get('p[id="bzipcode"] input').type(zipcode)
    cy.get('p[id="bphone"] input').type(phone)  
    cy.get('input[value="Save and Continue"]').click()

})


Cypress.Commands.add('order_details_verify', 
(firstname, lastname, address1, address2, city, zipcode)=>{

    cy.get('div[data-hook*="bill-address"]').within(()=>{
        cy.get('.fn').should('contain.text', firstname)
        .should('contain.text', lastname)
        cy.get('.street-address div').
        should('contain.text', address1)
        cy.get('.street-address div:nth-of-type(2)').
        should('contain.text', address2)   
        cy.get('.locality').
        should('contain.text', city)  
        cy.get('.postal-code').
        should('contain.text', zipcode)                                                     
  })

  cy.get('div[data-hook*="ship-address"]').within(()=>{
      cy.get('.fn').should('contain.text', firstname)
      .should('contain.text', lastname)
      cy.get('.street-address div').
      should('contain.text', address1)
      cy.get('.street-address div:nth-of-type(2)').
      should('contain.text', address2)   
      cy.get('.locality').
      should('contain.text', city)  
      cy.get('.postal-code').
      should('contain.text', zipcode)                                                    
})

})
