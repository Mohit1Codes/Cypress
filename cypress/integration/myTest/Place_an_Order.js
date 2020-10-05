import data from '../shared-data/TestData'

describe ('place an order', ()=>{

    before(()=>{

        let b = data()

        cy.visit(b.url)
    })

    it('order place',()=>{

        let a = data()

        cy.search('Jersey')

        cy.url().should('include', a.item2)
        cy.get('.search-results-title').should('contain.text', a.item2)

        cy.get('a[href*="apache-baseball-jersey"]').click()

        cy.url().should('include', 'apache-baseball-jersey')
        cy.get('.product-title').should('contain.text', 'Apache Baseball Jersey')

        cy.get('input#quantity').clear().type(2)
        cy.get('button#add-to-cart-button').click()

        cy.url().should('include', 'cart')
        cy.get('div[data-hook="cart_container"] h1').should('contain.text', 'Shopping Cart')
        cy.get('button#checkout-link').click()

        cy.create_new_user(a.newEmail2, 'qwerty')

        cy.url().should('include', 'address')

        

        cy.billing_address(a.firstname, a.lastname, a.address1,
        a.address2, a.country, a.state, a.city, a.zipcode, a.phone)    
        
        cy.url().should('include', 'delivery')
        cy.get('input[value="Save and Continue"]').click()

        cy.url().should('include', 'payment')
        cy.get('input[id*="payment_method_id_3"]').click()
        cy.get('input[value="Save and Continue"]').click()

        cy.get('.alert.alert-notice').should('be.visible')
        .should('contain.text', 'Your order has been processed successfully')

        cy.order_details_verify(a.firstname, a.lastname,
        a.address1, a.address2, a.city, a.zipcode) 
      
      cy.get('span#order_total').should('contain.text','$46.98')

    })



})