describe('Main Test', () => {
 
  beforeEach('Connect to home', () => {
      // cy.visit('/');
      cy.visit('http://localhost:3000/', { 
        headers: {
          "Accept-Encoding": "gzip, deflate",
          "timeout": 120000
        }
      });
  })

  it('Redirect to login page', () => {
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/login')
    })
  })

  it('Redirect to login page', () => {
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/login')
    })
  })

  it('sets auth token when logging in via form submission', () => {
    cy.get('#email')
    .should('be.visible')
    .should('have.focus')
    .type("test5@test.com")
    
    cy.get('#password')
    .should('be.visible')
    .type("testtest")

    cy.get('.MuiButton-label')
      .should('be.visible')
      .click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/home')
    })

    cy.should(() => {
      expect(localStorage.getItem('stud-connect@firstname')).to.eq('lena')
      expect(localStorage.getItem('stud-connect@lastname')).to.eq('test')
      expect(localStorage.getItem('stud-connect@role')).to.eq('STUDENT')
      expect(localStorage.getItem('stud-connect@token')).to.be.a('string')
    })

    cy.get('.flex_column > .MuiTypography-root').should('contain', 'lena test')
  })
})