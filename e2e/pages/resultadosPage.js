// Page Object: interações e verificações na página de resultados.
// Fornece asserts para verificar presença de texto, ausência de resultados,
// ações de download e verificação da tabela de resultados.
export class ResultadosPage {
  // Verifica se um texto específico está visível na página de resultados
  verificarResultadoVisivel(texto) {
    cy.contains(texto, { timeout: 15000 }).should('be.visible')
  }

  // Verifica se a mensagem de 'sem resultados' está visível
  verificarSemResultados(mensagem) {
    cy.contains(mensagem, { timeout: 15000 }).should('be.visible')
  }

  // Clica no link 'CSV' para iniciar o download e limpa pasta antes
  baixarCSV() {
    const downloadPath = 'downloads'
    cy.task('deleteDownloads', downloadPath)
    cy.contains('a', 'CSV', { timeout: 10000 }).click({ force: true })
    cy.wait(5000)
  }

  // Verifica se um arquivo com a extensão esperada foi baixado
  verificarDownload(extensao) {
    cy.task('getDownloadedFiles', 'downloads').then((files) => {
      const matchingFile = files.find(file => file.endsWith(`.${extensao}`))
      expect(matchingFile).to.exist
    })
  }

  // Verifica se a tabela de resultados está visível (após filtros)
  verificarTabelaAtualizada() {
    cy.get('table.results-table', { timeout: 15000 }).should('be.visible')
  }
}