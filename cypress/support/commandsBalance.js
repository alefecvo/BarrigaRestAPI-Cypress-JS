//Comando criado para movimentacao passando Token e outros dados
Cypress.Commands.add('getBalanceByName', (token, name, value)=>{
    //Criando uma requisicao para recuperar saldo, passando token no head da requisicao
    cy.request({
        method: 'GET',
        headers: {
            Authorization: `JWT ${token}`
        },
        url: '/saldo'
    }).then(res => {
        //Recuperando saldo da conta para fazer validacao
        let saldoConta = null
        res.body.forEach(it =>{
        if(it.conta == name)
            saldoConta = it.saldo
        })
        expect(saldoConta).to.be.equal(value)
    })
})