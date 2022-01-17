/// <reference types="cypress" />

context('uploadServer', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001')
        cy.viewport(1600, 900)
    })

    it('list', () => {
        cy.get('[data-testid="RefreshOutlinedIcon"]').click()
        cy.compareSnapshot('list')
    })

    it('list - search', () => {
        cy.get('.MuiInput-input').clear()
        cy.get('.MuiInput-input').type('superxray-sz-013')
        cy.compareSnapshot('list - search')

        cy.get('.MuiInput-input').clear()
        cy.get('.MuiInput-input').type('运行中')
        cy.compareSnapshot('list - search - status')

        cy.get('.MuiInput-input').clear()
        cy.get('.MuiInput-input').type('test_location')
        cy.compareSnapshot('list - search - location')

        cy.get('.MuiInput-input').clear()
        cy.get('.MuiInput-input').type('nofound')
        cy.compareSnapshot('list - search - nofound')

        cy.get('.MuiInput-input').clear()
        cy.compareSnapshot('list - search - clear')
    })

    it('detail - list', () => {
        cy.get(
            ':nth-child(1) > [aria-sort="descending"] > a > .MuiBox-root'
        ).click()
        cy.compareSnapshot('detail - list')
    })

    it('detail - grid', () => {
        cy.get(
            ':nth-child(1) > [aria-sort="descending"] > a > .MuiBox-root'
        ).click()
        cy.get('[data-testid="GridViewOutlinedIcon"] > path').click({
            force: true,
        })
        cy.compareSnapshot('detail - grid')
    })

    it('language', () => {
        cy.get('.css-17zzj0j > .MuiBox-root').click()
        cy.compareSnapshot('language')
    })
})
