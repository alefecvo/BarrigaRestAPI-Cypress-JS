/// <reference types="cypress"/>

import credentials from '../../support/credentials'
import '../../support/commandsLogin'
import '../../support/commandsAccount'
import '../../support/commandTransaction'

describe('Test account in barrigarest', () =>{

    //Definindo variavel token
    let token
    let user = credentials.user
    let password = credentials.password

    //Realizar login ao inicializar execucao
    before(()=>{
        //Fazendo uma requisicao, passando as credenciais e recuperando o token
        cy.getToken(user, password)
            .then(tkn =>{
                token = tkn
            })
    })

    //Para cada teste ele reseta os dados
    beforeEach(() =>{
        //Chamando funcao para resetar dados da tela para estado inicial passando Token
        cy.resetRest(token)
    })

    //Cenário - Criar uma nova transacao (movimentacao)
    it('Should create a transaction', ()=>{
        //Recuperando id atraves do nome da conta
        cy.getAccountByName(token, 'Conta para movimentacoes')
            .then(contaId => {
                // //Criando uma requisicao para criar uma trasacao, passando token no head da requisicao       
                cy.createNewTransaction(
                    token,
                    contaId,
                    Cypress.moment().add({days:1}).format('DD/MM/YYYY'),
                    Cypress.moment().format('DD/MM/YYYY'),
                    'Movimentacao para teste',
                    'AAA',
                    true,
                    'DESP',
                    1500
                )
        }).as('response')

        //Validando resposta da requisicao, status code 201 e nome que já existe
        cy.get('@response').its('status').should('be.equal',201)
        cy.get('@response').its('body.id').should('exist')      
    })          
 
    //Cenário - Remover uma transacao (movimentacao)
    it('Should remove a transaction', ()=>{
        //Recuperando id atraves do nome da movimentacao
        cy.getTransactionByName(token, 'Movimentacao para exclusao')
            .then(transacaoId =>{
                //Criando uma requisicao para deletar uma movimentacao, passando token no head da requisicao
                cy.request({
                    method: 'DELETE',
                    // headers: {
                    //     Authorization: `JWT ${token}`
                    // },
                    url: `/transacoes/${transacaoId}`
                }).as('response')
                //Validando status code 204 da requisicao
                cy.get('@response').then(res =>{
                    expect(res.status).to.be.equal(204)
                })
        })
    })
})
