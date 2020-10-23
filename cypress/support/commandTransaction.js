//Comando criado para movimentacao passando Token e outros dados
Cypress.Commands.add('createNewTransaction', (token,
    contaId,
    dtPagamento,
    dtTransacao,
    descDescricao,
    envEnvolvido,
    stStatus,
    tpTipo,
    vValor
    )=>{  
    //Criando uma requisicao para criar uma trasacao, passando token no head da requisicao
    cy.request({
        method: 'POST',
        headers: {
            Authorization: `JWT ${token}`
        },
        url: '/transacoes',
        body:{
            conta_id: contaId,
            data_pagamento: dtPagamento,
            data_transacao: dtTransacao,
            descricao: descDescricao,
            envolvido: envEnvolvido,
            status: stStatus,
            tipo: tpTipo,
            valor: vValor
        }
    })
})

//Comando criado para editar movimentacao passando Token e outros dados
Cypress.Commands.add('editTransaction', (
    token,
    contaId,
    transactionId,
    dtPagamento,
    dtTransacao,
    descDescricao,
    envEnvolvido,
    stStatus,
    vValor
    )=>{  
    //Criando uma requisicao para criar uma trasacao, passando token no head da requisicao
    cy.request({
        method: 'PUT',
        headers: {
            Authorization: `JWT ${token}`
        },
        url: `/transacoes/${transactionId}`,
        body:{
            conta_id: contaId,
            data_pagamento: dtPagamento,
            data_transacao: dtTransacao,
            descricao: descDescricao,
            envolvido: envEnvolvido,
            status: stStatus,
            valor: vValor
        }
    })
})

//Comando criado para recuperar IdMovimentacao passando Token e Descricao
Cypress.Commands.add('getTransactionByName', (token, desc)=>{  
    //Criando requisicao e retornando IdMovimentacao
    cy.request({
        //Passando na requisicao metodo, url e body
        method: 'GET',
        url: '/transacoes',
        headers: {
            Authorization: `JWT ${token}`
        },
        qs:{
            descricao: desc
        }
    })
    .then(res => {
        return res.body[0].id
    })
})