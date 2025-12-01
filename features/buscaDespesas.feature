#language: pt

Funcionalidade: Busca de despesas no Portal da Transparência de Cabedelo

  Cenário: Acessar página inicial com sucesso
    Dado acesso o Portal da Transparência de Cabedelo
    Então o título da página deve conter "Portal da Transparência"

  Cenário: Realizar a busca pelo termo com resultados
    Dado que estou na página inicial
    Quando acesso a seção de Execução Orçamentária e depois Despesas
    E busco pelo termo válido
    Então devo ver resultados da busca
    E o texto "Educação" deve estar visível

  Cenário: Realizo a busca por termo sem resultados
    Dado que estou na página de despesas
    Quando busco pelo termo inválido
    Então deve ser exibida a mensagem "Nenhum registro encontrado"

  Cenário: Aplicar filtro do ano 2024
    Dado que realizei uma busca com resultados
    Quando seleciono o ano "2024"
    Então a tabela deve ser atualizada