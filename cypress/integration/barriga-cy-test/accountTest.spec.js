/// <reference types="cypress"/>

import credentials from '../../support/credentials'
import '../../support/commandsLogin'
import '../../support/commandsAccount'

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

     //Cenário - Criar uma nova conta
    it('Should create an account',()=>{
        //Criando uma requisicao para criar conta com mesmo nome, passando token no head da requisicao
        cy.createNewAccount(token, 'Conta criada')
            .as('response')

        //Validando resposta da requisicao, status code 201 e nome que foi criado
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('nome', 'Conta criada')
        })
    })

    //Cenário - Editar uma conta existente
    it('Should update an account',()=>{
        //Recuperando id atraves do nome da conta
        cy.getAccountByName(token, 'Conta para alterar')
            .then(contaId => {
        
        //Chamando funcao para editar uma conta passando Token e Nome
        cy.editAccount(token, contaId,'Conta alterada via rest')
            }).as('response')
    
         //Validando resposta da requisicao, status code 201 e nome que foi criado
         cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('nome', 'Conta alterada via rest')
        })    
    })

    //Cenário - Criar uma conta com o mesmo nome de uma existente
    it('Should not create an account with same name', ()=>{
        //Criando uma requisicao para criar conta com mesmo nome, passando token no head da requisicao
        cy.createNewAccount(token, 'Conta mesmo nome')
            .as('response')
       
        //Validando resposta da requisicao, status code 400 e nome que já existe
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })
})
