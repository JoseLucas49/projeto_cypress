  // Insere o termo na caixa de busca e aciona o botão 'Buscar'
export class DespesasPage {
  buscarTermo(termo) {
    cy.get('input[name="q"]', { timeout: 10000 }).clear().type(termo)
    cy.contains('button', 'Buscar').click({ force: true })
  }

  // Seleciona o ano no filtro e aplica a filtragem
  selecionarAno(ano) {
    cy.get('select[name="ano"]', { timeout: 15000 }).select(ano)
    cy.contains('button', 'Aplicar').click({ force: true })
  }
}