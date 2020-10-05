import data from '../shared-data/TestData'

describe('Search for an item', ()=>{

    before(()=>{

        let b = data()

        cy.visit(b.url)
    })

    
    it("item search", ()=>{


          let a = data()

          cy.search((a.item1))
 
          cy.get('.search-results-title').should('contain.text', a.item1)

           cy.get('span[title*="Jersey"]').should('have.length', 2)

    })


})