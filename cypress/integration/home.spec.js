describe('Main Test', () => {
  beforeEach('Connect to home', () => {
      cy.visit('/');
  })

  it('Redirect to login page', () => {
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/login')
    })
  })
})