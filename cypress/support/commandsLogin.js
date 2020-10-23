//Comando para realizar autenticacao
Cypress.Commands.add('doLogin', (user, password)=>{
    //Criando requisicao para fazer autenticacao
    cy.request({
        //Passando na requisicao metodo, url e body
        method: 'POST',
        url: '/signin',
        body:  {
            email: user, 
            senha: password, 
            redirecionar: false
        }
    })
})

//Comando para recuperar token
Cypress.Commands.add('getToken', (user, password)=>{
    //Criando requisicao
    cy.request({
        //Passando na requisicao metodo, url e body
        method: 'POST',
        url: '/signin',
        body:  {
            email: user, 
            senha: password, 
            redirecionar: false
        }
    }).its('body.token').should('not.be.empty') //Validando token nao pode estar vazio
    .then(token =>{
        Cypress.env('token',token)
        return token
    })
})

//Comando criado para resetar dados da tela para estado incial passando Token
Cypress.Commands.add('resetRest', (token)=>{  
    //Criando requisicao e validando status code
    cy.request({
        //Passando na requisicao metodo, url e body
        method: 'GET',
        url: '/reset',
        headers: {
            Authorization: `JWT ${token}`
        }
    }).its('status').should('be.equal', 200)  
})