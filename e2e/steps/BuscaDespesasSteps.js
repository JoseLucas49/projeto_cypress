/// <reference types="cypress" />

// Steps do Cucumber: mapeia os passos em Gherkin para implementações em Cypress.
// Contém cenários de busca, filtros e download de resultados.
import { Dado, Quando, Então } from '@badeball/cypress-cucumber-preprocessor'
import { HomePage } from '../pages/homePage'
import { DespesasPage } from '../pages/despesasPage'
import { ResultadosPage } from '../pages/resultadosPage'

// Instâncias das Page Objects usadas pelos steps
const home = new HomePage()
const despesas = new DespesasPage()
const resultados = new ResultadosPage()

Dado('que acesso o Portal da Transparência de Cabedelo', () => {
  cy.visit('/')
})

Então('o título da página deve conter {string}', (texto) => {
  cy.title().should('include', texto)
})

Dado('que estou na página inicial', () => {
  cy.visit('/')
})

Quando('acesso a seção de Execução Orçamentária e depois Despesas', () => {
  home.acessarExecucaoOrcamentaria()
  home.acessarDespesas()
})

Quando('busco pelo termo válido', () => {
  cy.fixture('termos').then((data) => {
    despesas.buscarTermo(data.valido)
  })
})

Então('devo ver resultados da busca', () => {
  cy.get('table.results-table', { timeout: 20000 }).should('be.visible')
})

Então('o texto {string} deve estar visível', (texto) => {
  resultados.verificarResultadoVisivel(texto)
})

Dado('que estou na página de despesas', () => {
  cy.visit('/execucao-orcamentaria/despesas')
})

Quando('busco pelo termo inválido', () => {
  cy.fixture('termos').then((data) => {
    despesas.buscarTermo(data.invalido)
  })
})

Então('deve ser exibida a mensagem {string}', (mensagem) => {
  resultados.verificarSemResultados(mensagem)
})

Dado('que realizei uma busca com resultados', () => {
  cy.visit('/execucao-orcamentaria/despesas')
  cy.fixture('termos').then((data) => {
    despesas.buscarTermo(data.valido)
  })
})

Quando('seleciono o ano {string}', (ano) => {
  despesas.selecionarAno(ano)
})

Então('a tabela deve ser atualizada', () => {
  resultados.verificarTabelaAtualizada()
})

Dado('estou em uma página de resultados com dados', () => {
  cy.visit('/execucao-orcamentaria/despesas')
  cy.fixture('termos').then((data) => {
    despesas.buscarTermo(data.valido)
  })
  cy.get('table.results-table', { timeout: 20000 }).should('be.visible')
})

Quando('clicar no link de download CSV', () => {
  resultados.baixarCSV()
})

Então('o arquivo CSV deve ser baixado com sucesso', () => {
  resultados.verificarDownload('csv')
})