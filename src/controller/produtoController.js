import mysql from 'mysql2/promise'
import { Router } from "express";
import { cadastrarDetalhes, cadastrarProduto, cadastrarImagens, deletar, buscarImagens } from '../repository/produtoRepository.js';

const produtoEndpoints = Router();

produtoEndpoints.post('/imagem', async (req, resp) => {
    
})


produtoEndpoints.post('/produto', async (req, resp) => {
    const infoDetalhes = {
        intensidade: req.body.intensidade,
        docura: req.body.docura,
        acidez: req.body.acidez,
        torra: req.body.torra,
        descricao: req.body.descricao,
        marca: req.body.marca,
        peso: req.body.peso,
        alergia: req.body.alergia,
        dimensoes: req.body.dimensoes
    };

    const idDetalhe = await cadastrarDetalhes(infoDetalhes);
    
    const infoProduto = {
            idDetalhe: idDetalhe,
            idAdm: req.body.idAdm,
            idCategoria: req.body.idCategoria,
            nome: req.body.nome,
            preco: req.body.preco,
            promocional: req.body.promocional,
            disponivelAssinatura: req.body.disponivelAssinatura,
            estoque: req.body.estoque
        };
        
    const cadastro = await cadastrarProduto(infoProduto);
    resp.send(cadastro);
});

produtoEndpoints.delete('/deletar/:id', async (req, resp) => {
    try{
        const {id} = req.params
        if(!id || id === 0)
            throw new Error('Id não identificado ou inválido')

        const resposta = await deletar(id)

        if(resposta !== 1)
            throw new Error('Não foi possivel excluir')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/:id/imagens', async (req, resp) =>{
    try{
        const {id} = req.params
            if(!id || id === 0)
                throw new Error('Id não identificado ou indisponível')

        const resposta = await buscarImagens(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/produtos', async (req, resp) => {
    try{
        const resposta = await BuscarProdutos()

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/produto/:id', async (req, resp) => {
    try{
        const {id} = req.params
        if(!id)
            throw new Error('Id produto não identificado')

        const resposta = await BuscaProdutoId(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.get('/detalhes/:id', async (req, resp) => {
    try{
        const {id} = req.params
        if(!id)
            throw new Error('Id detalhe não identificado')

        const resposta = await BuscaDetalhesId(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

produtoEndpoints.put('/:id/produto', async (req, resp) =>{
    try{
        const produto = req.body
        const {id}= req.params
        if(!produto.nome)
            throw new Error('Nome do produto não definido')
        if(!produto.preco)
            throw new Error('Preço obrigatório')
        if(!produto.id_admin)
            throw new Error('ADM não selecionado')
        if(!produto.id_categoria)
            throw new Error('Categoria obrigatória')
        if(!produto.estoque)
            throw new Error('Estoque obrigatório')
        if(!produto.assinatura)
            throw new Error('Assinatura obrigatório')

        const resposta = await AlterarProduto(produto, id)

        if(resposta !== 1)
            throw new Error('Não foi possivel alterar')

        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})
produtoEndpoints.put('/produto/:id/detalhes', async (req, resp) => {
    try{
        const detalhes = req.body
        const {id} = req.params

        if(!detalhes.intensidade)
            throw new Error('Intensidade obrigatório')
        if(!detalhes.docura)
            throw new Error('Doçura obrigatório')
        if(!detalhes.acidez)
            throw new Error('Acidez obrigatorio')
        if(!detalhes.torra)
            throw new Error('Torra obrigatório')
        if(!detalhes.produto)
            throw new Error('Detalhes do produto obrigatório')
        if(!detalhes.marca)
            throw new Error('Marca obrigatório')
        if(!detalhes.peso)
            throw new Error('Peso obrigatório')
        if(!detalhes.dimensoes)
            throw new Error('As dimensões do produto são obrigatório')

        const resposta = await AlterarDetalhesProduto(detalhes, id)

        if(resposta !== 1) 
            throw new Error('Os detalhes pode ser alterado')
        
        resp.status(204).send()
    }
    catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

export default produtoEndpoints;
