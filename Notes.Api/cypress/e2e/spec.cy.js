describe('Notes Application E2E Tests', () => {
    const BASE_URL = 'http://localhost:61573';
    const API_URL = 'https://localhost:7146/api';

    beforeEach(() => {

        cy.visit(BASE_URL);

        cy.get('h1').should('be.visible');
    });

    it('should load the application and display the main interface', () => {

        cy.get('h1').should('contain.text', 'Notes');

        cy.get('.btn-primary').contains('Add Note').should('be.visible');

        cy.get('.btn-lang').should('be.visible');
    });

    it('should create a new note successfully', () => {

        cy.intercept('POST', `${API_URL}/Notes`, {
            statusCode: 201,
            body: {
                id: 1,
                title: 'Test Note',
                content: 'This is a test note content'
            }
        }).as('createNote');

        cy.get('.btn-primary').contains('Add Note').click();

        cy.get('.note-form-overlay').should('be.visible');
        cy.get('.note-form').should('be.visible');

        cy.get('#title').type('Test Note');
        cy.get('#content').type('This is a test note content');

        cy.get('.btn-primary').contains('Save').click();

        cy.wait('@createNote');

        cy.get('.note-form-overlay').should('not.exist');

        cy.get('.note-card').should('contain.text', 'Test Note');
    });

    it('should edit an existing note', () => {

        cy.intercept('GET', `${API_URL}/Notes`, {
            statusCode: 200,
            body: [{
                id: 1,
                title: 'Original Note',
                content: 'Original content'
            }]
        }).as('loadNotes');

        cy.intercept('PUT', `${API_URL}/Notes/1`, {
            statusCode: 200,
            body: {
                id: 1,
                title: 'Updated Note',
                content: 'Updated content'
            }
        }).as('updateNote');

        cy.reload();
        cy.wait('@loadNotes');

        cy.get('.note-card .btn-icon').first().click();

        cy.get('#title').should('have.value', 'Original Note');
        cy.get('#content').should('have.value', 'Original content');

        cy.get('#title').clear().type('Updated Note');
        cy.get('#content').clear().type('Updated content');

        cy.get('.btn-primary').contains('Save').click();

        cy.wait('@updateNote');

        cy.get('.note-card').should('contain.text', 'Updated Note');
    });

    it('should delete a note with confirmation', () => {

        cy.intercept('GET', `${API_URL}/Notes`, {
            statusCode: 200,
            body: [{
                id: 1,
                title: 'Note to Delete',
                content: 'This note will be deleted'
            }]
        }).as('loadNotes');

        cy.intercept('DELETE', `${API_URL}/Notes/1`, {
            statusCode: 200
        }).as('deleteNote');

        cy.reload();
        cy.wait('@loadNotes');

        cy.get('.note-card .btn-danger').click();

        cy.get('.swal2-popup').should('be.visible');
        cy.get('.swal2-confirm').click();

        cy.wait('@deleteNote');

        cy.get('.note-card').should('not.exist');
    });

    it('should validate required fields in note form', () => {

        cy.get('.btn-primary').contains('Add Note').click();

        cy.get('.btn-primary').contains('Save').click();

        cy.get('.error-message').should('be.visible');
        cy.get('#title').should('have.class', 'error');

        cy.get('#title').type('Valid Title');
        cy.get('.error-message').should('not.exist');
    });

    it('should cancel note creation', () => {

        cy.get('.btn-primary').contains('Add Note').click();
        cy.get('.note-form-overlay').should('be.visible');

        cy.get('#title').type('Test Title');
        cy.get('#content').type('Test Content');

        cy.get('.btn-secondary').contains('Cancel').click();

        cy.get('.note-form-overlay').should('not.exist');
        cy.get('.note-card').should('not.contain.text', 'Test Title');
    });

    it('should toggle language', () => {

        cy.get('.btn-lang').click();

        cy.get('.btn-lang').should('contain.text', 'Українська');

        cy.get('.btn-lang').click();
        cy.get('.btn-lang').should('contain.text', 'English');
    });

    it('should handle API errors gracefully', () => {

        cy.intercept('GET', `${API_URL}/Notes`, {
            statusCode: 500,
            body: { message: 'Server Error' }
        }).as('loadNotesError');

        cy.reload();
        cy.wait('@loadNotesError');

        cy.get('.error').should('be.visible');
        cy.get('.error').should('contain.text', 'Failed to fetch notes');
    });

    it('should display empty state when no notes exist', () => {

        cy.intercept('GET', `${API_URL}/Notes`, {
            statusCode: 200,
            body: []
        }).as('loadEmptyNotes');

        cy.reload();
        cy.wait('@loadEmptyNotes');

        cy.get('.empty-state').should('be.visible');
        cy.get('.empty-state h3').should('contain.text', 'No notes');
    });

    it('should show loading state', () => {

        cy.intercept('GET', `${API_URL}/Notes`, {
            delay: 2000,
            statusCode: 200,
            body: []
        }).as('slowLoadNotes');

        cy.reload();

        cy.get('.loading').should('be.visible');

        cy.wait('@slowLoadNotes');

        cy.get('.loading').should('not.exist');
    });
});