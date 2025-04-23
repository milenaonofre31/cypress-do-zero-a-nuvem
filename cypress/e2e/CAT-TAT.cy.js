describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => { //antes de cada teste será realizado este script
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário',()=>{
    const longText =Cypress._.repeat('testando a aplicação da melhor forma', 10)

    cy.get('#firstName').type('Milena')
    cy.get('#lastName').type('Onofre')
    cy.get('#email').type('contato.milenaonofre@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('sem preencher e-mail corretamente, verificando aviso',()=>{
        
    cy.get('#firstName').type('Milena')
    cy.get('#lastName').type('Onofre')
    cy.get('#email').type('contato.milenaonofregmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando é preenchido com valor não numérico',()=>{
    cy.get('#phone')
      .type('abdc')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',()=>{
    cy.get('#firstName').type('Milena')
    cy.get('#lastName').type('Onofre')
    cy.get('#email').type('contato.milenaonofre@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos', ()=>{
    cy.get('#firstName')
      .type('Milena')
      .should('have.value', 'Milena')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Onofre')
      .should('have.value', 'Onofre')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('contato.milenaonofre@gmail.com')
      .should('have.value', 'contato.milenaonofre@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
  })
  it('Exibe mensagem de erro ao submeter formulário sem preencher os campos obrigatórios',()=>{
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })
  it('Envia formulário com comando customizado',()=>{
    cy.fillMandatoryFieldsAndSubmit() //função para preencher campos obrigatórios e enviar (arquivo está em cypress/support/commands.js)
    
    cy.get('.success').should('be.visible')

  })

  it('Seleciona um produto Youtube por seu texto', ()=> {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

  })
  it('Seleciona um produto (Mentoria) por (value)', ()=> {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })

  it('Seleciona um produto (Blog) por seu (indice)', ()=> {
    cy.get('#product')
      .select(1) // referente ao indice 1
      .should('have.value', 'blog')
  })

  it('marca no radio o tipo de atendimento "Feedback"', ()=> {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')//utilizado para verificar se está checado mesmo
  })
  it('marca cada tipo de atendimento', ()=> {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService) //each chama uma função wrap que encapsula todos os valores radio
          .check()
          .should('be.checked')
      })
  })

  it('marcar ambos checkboxes, depois desmarca o ultimo', ()=>{
    cy.get('input[type="checkbox"]')
      .check()//marcará todos checkbox
      .should('be.checked')
      .last()//selecione o ultimo checkbox
      .uncheck() //desmarque
      .should('not.be.checked')//verifique se não está marcado mesmo
  })
  
  it('Exibe mensagem de erro quando o teelfone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    
    cy.get('#firstName').type('Milena')
    cy.get('#lastName').type('Onofre')
    cy.get('#email').type('contato.milenaonofre@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').check() // aqui ficou check ao invés de click pois pode ser desmarcado
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('seleciona arquivo da pasta fixtures', ()=> {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => { 
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => { 
        expect(input[0].files[0].name).to.equal('example.json') // simula arrasta de arquivos, não altera na aplicação, está 'por baixo dos panos'
      })
  })
  it('seleciona arquivo utilizando uma fixture para qual foi dada um alias ', ()=> {
    cy.fixture('example.json').as('sampleFile')//criando um alias file
    cy.get('#file-upload')
      .selectFile('@sampleFile')// para utilizar o alias basta colocar o @
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica a política de privacidade abre em outra aba sem necessidade de clique', ()=> {
    cy.contains('a', 'Política de Privacidade') // encontra o elemento a chamado Política de Privacidade
      .should('have.attr', 'href', 'privacy.html') // verifica o atributo
      .and('have.attr', 'target', '_blank') // e ver se ele está abrindo a página
   })

   it('acessa a página de política de privacidade sem utilizar o target', ()=> {
    cy.contains('a', 'Política de Privacidade') // encontra o elemento a chamado Política de Privacidade
      .invoke('removeAttr', 'target') // remove o target
      .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')// verifica se o título da pag está disponível
   })

})