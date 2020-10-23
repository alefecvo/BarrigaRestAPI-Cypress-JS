/// <reference types="cypress"/>

import credentials from '../../support/credentials'
import '../../support/commandsLogin'

let user = credentials.user
let password = credentials.password

describe('Test auth in barrigarest', () =>{

    //Cenário - Realizar login
    it('Should do login',()=>{
       //Fazendo uma requisicao para teste do login
       cy.doLogin(user, password)
        .as('response')

       //Validando resposta da requisicao com sucesso (Status code 200)
       cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(200)
       })
    })

    //Cenário - Realizar captura de token
    it('Should get token',()=>{
        //Fazendo uma requisicao para recuperar token
        cy.doLogin(user, password)
         .as('response')
 
        //Validando resposta da requisicao com sucesso (Status code 200)
        cy.get('@response').then(res =>{
             expect(res.status).to.be.equal(200)
        })
     })
})
