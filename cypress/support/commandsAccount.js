//Comando criado para recuperar IdConta passando Token e NomeConta
Cypress.Commands.add('getAccountByName', (token, account)=>{  
    //Criando requisicao e retornando IdConta
    cy.request({
        //Passando na requisicao metodo, url e body
        method: 'GET',
        url: '/contas',
        headers: {
            Authorization: `JWT ${token}`
        },
        qs:{
            nome: account
        }
    }).then(res => {
        return res.body[0].id
    })
})

//Comando criado para criar uma nova Conta passando Token e Nome
Cypress.Commands.add('createNewAccount', (token, name)=>{  
     //Criando uma requisicao para criar uma conta, passando token no head da requisicao
    cy.request({
        method: 'POST',
        headers: {
            Authorization: `JWT ${token}`
        },
        url: '/contas',
        body:{
            nome: name
        },
        failOnStatusCode:false
    })
})

//Comando criado para editar uma Conta passando Token e Nome
Cypress.Commands.add('editAccount', (token,contaId,name)=>{  
     //Criando uma requisicao para editar uma conta, passando token no head da requisicao
     cy.request({
        method: 'PUT',
        headers: {
            Authorization: `JWT ${token}`
        },
        url: `/contas/${contaId}`,
        body:{
        nome: name
        }
    })
})