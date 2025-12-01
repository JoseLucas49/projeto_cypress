# language: pt
Funcionalidade: Download de arquivos

  Cenário: Baixar relatório em formato CSV
    Dado estou em uma página de resultados com dados
    Quando clicar no link de download CSV
    Então o arquivo CSV deve ser baixado com sucesso