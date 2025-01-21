import { AddTitleRatingSummary } from '../support/storedataCommand.js'

describe('IMDb Top 250 Movies', () => {
    beforeEach('visit to the website and click to detailed option', () => {
        cy.viewport(1543, 839)
        cy.visit('https://www.imdb.com/chart/top/')
        cy.get('#list-view-option-detailed').click()
    })

    it('Get title, rating, vote count, and details', () => {
        cy.AddTitleRatingSummary('ipc-metadata-list')
    });
    
})