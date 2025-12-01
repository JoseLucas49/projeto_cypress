// Page Object: ações disponíveis na página inicial.
// Fornece métodos para navegar até Execução Orçamentária e Despesas.
export class HomePage {
  // Clica no link 'Execução Orçamentária' para abrir essa seção
  acessarExecucaoOrcamentaria() {
    cy.contains('a', 'Execução Orçamentária', { timeout: 10000 }).click({ force: true })
  }

  // Clica no link 'Despesas' dentro da seção de Execução Orçamentária
  acessarDespesas() {
    cy.contains('a', 'Despesas', { timeout: 10000 }).click({ force: true })
  }
}