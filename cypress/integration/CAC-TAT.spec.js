/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title()
          .should('be.equal', 'Central de Atendimento ao Cliente TAT')        
    })

    it('Preencher os campos obrigatórios e envia o formulário', function() {
      
      cy.clock()
      cy.fillMandatoryFields('Marcelo','Paz','teste@teste.com', 'teste, teste, teste, teste')
        cy.sendMe()

        cy.get('.success')
          .should('be.visible')

        cy.tick(3000)

        cy.get('.success')
          .should('not.be.visible')
    })
    
    it('Exibir mensagem de erro ao submeter o formulário com um email com formato inválido', function() {
        cy.clock()

        cy.fillMandatoryFields('Marcelo','Paz','teste@', 'teste, teste, teste, teste')
        
        cy.sendMe()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })
    
    it('Não permitir informar valores não-numéricos no campo telefone', function() {
        cy.get('#phone')
          .type('abcdefghijklmnopq')
          .should('have.value', '')
    })

    it('Exibir mensagem de erro quando o telefone se torna obrigatório e não é preenchido', function() {
        
        cy.get('#phone-checkbox')
          .click()
        cy.fillMandatoryFields('Marcelo','Paz','teste@teste.com', 'teste, teste, teste, teste')
        cy.sendMe()

        cy.get('.error').should('be.visible')
    })

    it('Exibir mensagem de erro quando o telefone se torna obrigatório e não é preenchido', function() {
        
        cy.get('#phone-checkbox')
          .click()
        cy.fillMandatoryFields('Marcelo','Paz','teste@teste.com', 'teste, teste, teste, teste')
        cy.sendMe()

        cy.get('.error').should('be.visible')
    })

    it('Preencher e limpar campos: nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Marcelo')
          .should('have.value','Marcelo')
          .clear()
          .should('have.value','')
        cy.get('#lastName')
          .type('Paz')
          .should('have.value', 'Paz')
          .clear()
          .should('have.value','')
        cy.get('#email')
          .type('teste@teste.com')
          .should('have.value', 'teste@teste.com')
          .clear()
          .should('have.value','')
        cy.get('#phone')
          .type('1234567890')
          .should('have.value', '1234567890')
          .clear()
          .should('have.value','')
    })

    it('Exibir mensagem de erro ao submeter sem o preenchimento dos campos obrigatórios', function() {
        cy.get('button[type="submit"]')
          .click()

        cy.get('.error')
          .should('be.visible')
    })


    it('Selecionar o produto youtube', function() {
        cy.get('#product').select('YouTube')
          .should('have.value','youtube')
    })

    it('Selecionar o produto mentoria', function() {
        cy.get('#product').select('mentoria')
          .should('have.value','mentoria')
    })

    it('Selecionar o produto blog', function() {
        cy.get('#product').select(1)
          .should('have.value','blog')
    })

    it('Selecionar o tipo de atendimento Feedback', function() {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')   
    })

    it('Marcar cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('Marcar ambos checkboxes e após, desmarcar o último', function () {
        cy.get('input[type="checkbox"]')
          .check()
          .last()
          .uncheck()
          .should('not.be.checked')
    })

    it('Selecionar um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Selecionar um arquivo da pasta fixtures utilizando drag-and-drop', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Selecionar um arquivo utilizando uma fixture com alias',function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('Acessar a página de política de privacidade', function(){
      cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
        .invoke('removeAttr', 'target')
        .click()
      cy.contains('Talking About Testing').should('be.visible')
    })

})