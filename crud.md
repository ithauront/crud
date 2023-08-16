devo criar uma API para gerenciar tarefas. essa api deve ser capaz de 
criar tasks - metodo post
listar tasks - metodo get
atualizar task pelo ID - metodo put
remover task pelo ID - metodo delete
marcar uma task como completa pelo ID - metodo patch?
* importar tasks em massa atravez de um arquivo csv usando stream * 

## rotas que iremos usar
POST - /tasks
GET - /tasks
PUT - /tasks/:id
DELETE - /tasks/:id
PATCH - /tasks/:id/complete

# estrutura da task
toda task deve ter
id 
title
description
completed_at - data de conclusção (valor inicial deve ser null) (provavelmente automatizar isso)
created_at - data de criação (provavelmente automatizar isso)
updated_at - atualizar essa data sempre que a task for alterada (provavelmente automatizar)

# extras
Validar se as propriedades title e description das rotas POST e PUT estão presentes no body da requisição. V


caso o id não seja passado na rota retornar a requsição dizendo que o id não foi enviado. V

Nas rotas que recebem o /:id, além de validar se o id existe no banco de dados, retornar a requisição com uma mensagem informando que o registro não existe. V

revisar se os codigos de header que a gente esta usando são os mais adequados. V

colocar no search para pesuisar tambem as datas V

# importação csv
para importar o csv vamos usar a lib CSV-parse com a lib instalada vamos criar um arquivo a parte para ler o csv
nesse arquivo deve ser feita a leitura do csv e para cada linha vamos mandar uma requisição para a rota POST - /tasks passando no body os campos necessarios. a recomendação de formato do csv é a seguinte, lembrando de deixar a primeira linha em branco:
title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
Task 03,Descrição da Task 03
Task 04,Descrição da Task 04
Task 05,Descrição da Task 05
como o id, e as datas são automaticas o nosso csv so precisa do title e da descrição.


