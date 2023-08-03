ao entrar na pasta do projeto a primeira coisa a fazer é dar um 

npm init -y

isso cria o arquivo package.json
é ele que vai armawenar as dependencias do nosso projeto.
vamos criar a pasta src e dentro dela um arquivo chamado server.js poderia ser index tambem mas no node por estarmos criando um servidor é mais legal chamarmos de server. ele vai ser o arquivo principal da aplicação. dentro dele a gente pode escrever qualquer codigo js.
se a gente fizer const a =2 e const b =3 e dar um console.log(a +b) e executar ele usando node src/server.js
ele vai retornar 10 no terminal.
se executa ele usando node
porem é bom saber que nos não vamos ter acesso as api especificas do browser como document.querySelector etc. porque são coisas especificas do browser.
porem o node nos da varios modulos que a gente possa usar. uma delas é o modulo de http
# modulo http 
para impostar esse modulo a gente pode usar
const http = require('http') - isso é um padrão de importação usando o require chamado de communJS 
esse modulo possui varias funcionalidades para construir aplicações http. com isso vamos criar rotas, get, post etc.
hoje em dia a gente praticamente não usa mais esse padrão, vamos usar o ESmodules, onde as importaões e exportação vao usar o import export. o problema é que por padrão o node não suporta ESmodules, para fazer ele suportar dentro do packageJSON a gente tem que colocar um 'type': "module"
como existe importações de fora do node, o node pede para a gente que quando formos importar algo que é de dentro do node a gente coloque node:o nome da imoortação. assim:
import http from 'node:http'
vamos criar nosso primeiro server:
const server = http.createServer(()=>{
    
})
pegamos a função createServer de dentro do http, e passamos para ele como unico parametro uma arrow function.
e por fim e fora da função damos um server.listen(3333)
isso significa que nosso servidor vai estar ouvindo a porta 3333.
a nossa arrow function recebe dois parametros.
req, res
ou seja request e response.
dentro do rew nos obtemos todas as informações da requisiçõe que chega el nosso servidor. e o res vai dar uma resposta a quem champou o servidor.
a gente pode dar uma resposta de helloworld dessa forma:
import http from 'node:http'


import http from 'node:http'


const server = http.createServer((req, res)=>{
return res.end('hello start ')
})

server.listen(3333)

executamos com node src/server.js
e ele vai ficar executando sem dizer nada porque ele esta ouvindo a porta 3333
ai abrimos nosso navegador na porta 3333
e ele vai mostrar la o helloworld.

o node não fica observando o servidor e restartando ele a cada mudança que a gennte faz então isso pode levar a confusão de não ver o que fazemos surtir efeito. para evitar isso vamos logo no inicio do projeto fazer um watch. então ao executarmos o node vamos executar com watch
node --watch src/server.js
por qlgum motivo não funciona comigo, talvez por conta da memoria do pc.
vamos adicionar um scrip de dev para fazer essa chamada agora podemos rodar com o npm run dev.
o scrip fica assim no package jason
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node --watch src/server.js"
  },

  # rotas
  rotas são caminhos de entrada para serem utilizados pela nossa api. ou seja quando um frontEdn for consumir nossa aplicação ele vai fazer atravez de rotas. meio de entrada e forma de usar nossa api como listar usuarios, remover usuarios, adicionar usuarios etc.
  uma requisição http é composta dedois recursos principais.
  o metodo http e a url
  no backend a gente recebe essas informações atravez do req
  podemos dar uma olhada neles usando a const 
  const {method, URL} = req

  então se a gente deixar o codigo assim e rodar ele 
  import http from 'node:http'


const server = http.createServer((req, res)=>{
    const {method, url} = req
    console.log(method, url)
return res.end('hello world')
})

server.listen(3333)

no nosso console.log de onde a gente esta rodando o npm run dev a gente vai ter o get / ou seja o metodo e o endereço. e no nosso terminal que rodarmos o http localhost:3333 teremos o hellowordl.

se a gente tivesse colocardo http localhost:3333/users
ele teria mostrado get /users
podemos trocar tambem o metodo da requisiçõ.
se a gente rodar isso:
http POST localhost:3333/users

o console.log de onde temos o node rodando vai nos dar isso 
POST /users

dentro  do http temos varios metodos mas os que vamos usar mais são os
GET
POST
DELETE
PATCH
PUT
os 5 que vamos sar sempre.
eles são mais semanticos do que fucnionais, na verdade podemos usar quaquer um mas semanticamente tem diferença
* GET 
usado quando vou buscar uma informação do backend

* POST
para criar alguma recurso no backend

* PUT 
para editar ou atualizar um recurso no backend

* PATCH
confundivel com o put mas ele serve principalmente para atualizar uma informação UNIca ou especifica de um recurso no backend put é para atualizar praticamente tudo em uma entidade. o patch é para atualizar so uma pequena coisa.
por exemplo o usuario vai atualizar seu formulario de usuario, foto, nome, descrição etc. usa o put.
temos uma rota para atualizar apenas se o usuario quer ou nõ receber notificação. usamos o patch, é algo especifico.

* DELETE 
serve para deletar um recurso do backend

no backend vamos diferenciar cada rota unicamente pela soma do metodo com a url.
o que quer dizer que posso ter duas rotas no meu backend
ex
/users as duas serem a mesma url porem com metodos diferentes dessa forma
POST /users => criou um usuario no backend
DELETE /users => deletou um usuario do backend

uma forma simples de a gente fazer isso para iniciar, que vai ser melhorada depois é com if
vamos ver que como o primeiro if ja da um return nos chamamos isso de early return, o java script se isso for verdadeiro nem le o resto da função então podemos na segunda continuar com um novo if
import http from 'node:http'


const server = http.createServer((req, res)=>{
    const {method, url} = req
    
if (method === 'GET' && url === '/users') {
    return res.end('listagem de usuarios')
}
if (method === 'POST' && url === '/users') {
    return res.end('usuario adicionado')
}
return res.end('hello world')
})

server.listen(3333)


com esse codigo vamos ter la onde fazemos a requizição um retorno de usuario adicionado ou listagem de usuario a depender do que usarmos em nossarequisiçãp e se fizermos na /users. se não vai ser helloworld 

# add users
vamos salvar os usuarios dentro da memoria de nossa aplicação.
,no node o projeto fica executando até se parar o projeto com cntrl c então todo que a gente declarar vai ficando salvo na memoria do node.
isso é o ocnceito statefull 
o statefull sempre vai ter agum tipo e informação sendo guardado em memoria, a aplicação depende das informação que sao salvas em memoria para continuar funcionando. caso ela perca seus dados e as informações em memoria ela pode não funcionar mais como estava
uma aplicação stateless não salva nada em memoria então se a gente parar a aplicação e rodar ela de novo tudo vai se manter igual.
porquequanto vamos criar uma ap statefull.
vamos criar uma constante users que vai ser um array vazio.
e a gente pode colocar um novo usuario dessa forma:
if (method === 'POST' && url === '/users') {
    users.push({
        id: 1,
        name: 'jhon doe',
        email: 'jhon@doe.com'
    })
    return res.end('usuario adicionado')

    porem para ver o usuario criado no pofdemos fazerso:
    if (method === 'GET' && url === '/users') {
    return res.end(users)

    porque a resposta do backend nao pode ser so um array
    ela pode ser uma string um buffer ou um uint8array (que tem a ver com o buffer)
    por isso vamos transformar o array em json, assim ele voltqa como string.
    para isso a gente vai fazer o JSON.stringfy(users)
    claro que sempre que a gente resetar o servidor a gente perde os informações, por isso a aplicação statefull é problematica em produção, não podemos perder os dados do servidor. por isso nos usamos mecanismos como banco de dados queveremos a frente.
    a nossa app esta assim e esta postando e trazendo de volta o users ela esta assim:
    import http from 'node:http'

const users = []
const server = http.createServer((req, res)=>{


    const {method, url} = req
    
if (method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users))
}
if (method === 'POST' && url === '/users') {
    users.push({
        id: 1,
        name: 'jhon doe',
        email: 'jhon@doe.com'
    })
    return res.end('usuario adicionado')
}
return res.end('hello world')
})

server.listen(3333)


porem, como o front end vai saber que trouxemos de volta um json?
por isso é necessario o cabeçalho

# headers
tanto da req quanto da res eles são metadados e metadados são informações para que o back e o front end saiba lidar com aqueles dados da melhor forma.
o headers não são bem a ver com o dado em si, mas sim meio que um manual de instruções para como o dado devo ser interpretado.
então la no res.end vamos separar para ficar assim
res
.end
e vamos setar tambem headers fica 
res
.setHeader(' aqui comocamos nome do cabeçalho  )
.end()

podemos pesquisar header mdn que tem uma lista de varios cabeçalhos comuns para termos em requisições. nos podemos dar o nome que quisermos mas tem alguns que são padroes de serem usados em api como o Content-type, onde a gente fala o conteudo e o tipo o tipo json vamos chamar de aplication/json
fica assim:
import http from 'node:http'

const users = []
const server = http.createServer((req, res)=>{


    const {method, url} = req
    
if (method === 'GET' && url === '/users') {
    return res
    .setHeader('Content-type', 'aplication/json')
    .end(JSON.stringify(users))
}
if (method === 'POST' && url === '/users') {
    users.push({
        id: 1,
        name: 'jhon doe',
        email: 'jhon@doe.com'
    })
    return res.end('usuario adicionado')
}
return res.end('hello world')
})

server.listen(3333)

dessa forma ele ja entende o que é e quando devolve para a gente ja devolve na estrutura mais correta, dentro do array e do objeto.

é bom saber que o frontend tambem envia headers em cada requisição
e a cada devoulção do backend tambem vamos mandar com headers.
se a gente der um req.headers a gente vai vr os metadados da requisição.

# http status code
quando devolvemos uma resposta cpara o frontend temos varios tipos de codigos numericos que enviamos para o frentend para dizer para o frontend o qeu aconteceu, erro, qual tipo de erro, se deu certo, qua tipo de informação estamos dando, etc. 
se a gente procurar mdn http status code encontramos um guia com os status code mais importante
eles tem 3 numeros e caminham por centenas de 100 a 600 e cada casa de centena se relaciona ao mesmo tipo de ocorrencia tipo 400 erros.
o 200 é ok e é um padrão caso de sucesso ela responde 200 a n éao ser que a gente modifique ela.
os 300 são redirecionamentos
400 erros da parte do cliente ou seja o cliente informou um endereço errado, um email errado algo errado
500 a 600 (termina em 599 não tem600) erro do server, o server não conseguiu responder por qlgum motivo. são erros inesperados, algo esta errado no backend. o banco de dados fora do ar por exemplo.

como vamos usar isso então.
na nossa resposta, não precisamos colocar algo como usuario criado, isso foi so para visualizar. e na resposta podemos informar o status ode usando o metodo writeHead(201) o 201 nesse caso simboliza uma resposta de sucesso de criação de algo.
com isso ele vai simbolizar para o frontend que foi criado. e isso vem no cabeçalho que podemos ver com o httpie. fica assim
if (method === 'POST' && url === '/users') {
    users.push({
        id: 1,
        name: 'jhon doe',
        email: 'jhon@doe.com'
    })
    return res.writeHead(201).end()
}

ao lançar o post o http a gente recebe isso
HTTP/1.1 201 Created
Connection: keep-alive
Date: Wed, 26 Jul 2023 14:30:49 GMT
Keep-Alive: timeout=5
Transfer-Encoding: chunked

repare que tem o 201 created.
paa brincar vamos fazer que se nem a rota de get nem a de post for chamada, vamos retornar um 404 de not found
 

# stream
vamos criar uma pasta temporaria chamada stream para entendermos os conceitos do stream no node.
o stream é muito importante para o node e ele é oresponsavel pelo sucesso do node.
o stream permite que a gente obtenha e leia pequenas partes de algo mesmo sem estar com ele todo carregado.
a gente pode trabalhar com qaueles dados mesmo antes de ter aquele arquivo por completo.
imagina que vams fazer uma importação de clientes via excel
é comum que a gente forneça para o usuario uma certa importação, o usuario da um upload de um aquivo em csv e a gente vai salvar ele no nosso sistema.
mas imagina que o usuario vai mandar algo de um giga de tamanho. se a gente não estiver utilizando o stream e a gente permitir que isso aconteça o usuario vai subir o csv e ele vai ser enviado atravez por exemplo de uma rota post algo como
POST /upload import.csv
o node vai ter que ler esse arquivo completo e depois disso ele vai percorrer o arquivo inteiro fazendo cada uma das operações de post dele.
agora imagina que o upload com a net da pessoa seja 10mb/s  vai demorar 100segudos para ela conseguir subir o arquivo. antes que o node comece a ler o arquivo e comece a fazer as incersoes.
com o conceito de stream a gente pode ter a vantagem de que no primeiro segundo do upload ja entrou 10mg ali o node podia começar a ler esses dez megas, e ja ir começando a inserir ele no banco de dados, antes de esperar todo 1 giga ser enviado para o servidor.
ou seja enquanto o upload esta sendo feito nos ja vamos processando ele.
então temos ai dois tipos de stream

os readble stream - stream de leitura - exemplo do csv - estamos lendo a informação aos poucos.

writable stream - stream de escritura - netflix spotfy - nos estamos enviando (escrevendo para o usuario) uma informação aos poucos

vamos criar esses conceitos em nossa aplicação.
no node toda porta de entrada e saida é automaticamente uma stream
ou seja o req e o res são streams.
então ao fazer uma requisição http, eu posso manter essa requisição aberta e enviar dados para ela aos poucos.
a mesma coisa quando devolvemos uma resposta, podemos devolver aos poucos.
no node temos varias portas de entrada e saida. alem da das portas req e res nos vamos lidar para entender esse conceito com o processo do node. o stdin e stdout
que é o que nos digitamos no terminal.


# solução vs code sem reconhecer o node
para solucionar isso nos precisamos adicionar o tipo node ao pacakge json.
com o comando  npm install --save-dev @types/node

agora ele vai reconhecer coisas com process e etc.

# criando um stream de leitura
vamos pegar o process é o processo que acontece no node
o stdin retorna uma string conectada a ele. o std é = tudo que o usuario digita no terminal, por isso são strings
depois disso vamos dar um .pipe() que é o encanamento no node a gente vai conectando as streams então por isso o pipe então se a gente pode ler dados aos poucos, a gente pode enviar esses dados aos poucos para uma stream que vai tratar deles. ai dentro do pipe vamos utilizar o process.stdout que vai ser o retorno da aplicação no terminal para mostrar como isso funciona.
fica assim e vamos executar esse arquivo
 node src/stream/fundamentsJS.js

 ai o node fica rodando e tudo que a gente digitar no terminal e der enter ele devolve a mesma coisa para nos.

 em outras palavras com o codigo que fizemos tudo que recebemos de entrada nos encaminhamos atravez do pipe para uma saida, o stdout. essa stream é de leitura e escrita por isso, estou lendo e escrevendo.
 agora vamos construir streams do zero dentr de um projeto.
 vamos  importr do node:stream a readeble e vamos criar uma classe que extende o readeble fica assim:
 import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {
    
}

toda classe readelbe recebe obrigatoriamenteo metodo _read() {}
esse metodo vai retornar quais são os dados dessa stream
vamos fazer essa função ir de um pra cem então vamos criar uma const index = 1
e dentro do read vamos fazer const i = this.index++
ou seja ir somando 1
agora vamos fazer
se o i for maior que 100 vamos executar this.push(null) push é o metodo para uma stream fornecer informações para quem estiver consumindo ela. ou seja dessa forma significa que ao ser maior que 100 não tem mais informações para serem adicionadas. ou seja, para.
caso sontrario queremo enviar o i então fazemos um this.push(i)
fica assim:
import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
    _read() {
        const i = this.index++

    if (i > 100) {
        this.push(null)
    } else {
        this.push(i)
    }
    }
}
new OneToHundredStream().pipe(process.stdout)
a linha do new é para ler a stream enquanto ele esta lendo a stream ele ja vai escrevendo.

porem esse codigo da erro.
porque?
dentro da stream eu não posso trabalhar apenas com strings ou numeros. o pedaço de dados que eu estou consumindo (chamado de chunk) não pode estar em um tipo primitivo (stinrg, numero, boolean etc). a gente precisa trabalhar com o formato de buffer.
então vamos criar uma variavel buff = Buffer.from(i)
esse Buffer.from(i) vai receber qual informação eu quero converter nesse formato buffer e ai damos push buff e não push i. porem o buffer não aceita numeros, apenas string, então temos quedar um String *não stringfy*. fica assim:
import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
    _read() {
        const i = this.index++

    if (i > 100) {
        this.push(null)
    } else {
        const buff = Buffer.from(String(i))
        this.push(buff)
    }
    }
}
new OneToHundredStream().pipe(process.stdout)

vamos deixar isso mais interessante. ao inves de apenas ler o i e adicionar mais 1 a gente colocar esse codigo dentro de um setTimeout dessa forma nos poderemos ver o funcionamento da stream indo aos poucos e andando e criando o resultado.
um setTimeout normal demoraria um tempo para iniciar e quando iniciasse mostraria todos os numeros muito rapido(praticamente de vez).
com uma stream ele vai mostrando cada numero aos poucos porque mesmo ates de terminar de ler ele ja entregou o primeiro ciclo e escreveu, depois ele inicia o segundo cilco e escreve etc.
então para resumo com stream a gente consegue ir trabalhando os dados antes de eles estarem completamente processados.
a gente fez essa stream do Zero mas os modulos internos do node vao nos permitir de não precisar fazer sempre do zero, por exemplo o req e res ja são streams se a gente der req.pipe ele ja aparece.

# stream de escritura
vai receber dados de uma stream de leitura e fazer algo com eles. como por exemplo o stdout na nossa função anterior que escrivia os numeros no terminal.
vamos fazer nossa stream de escritura. vamos importar writable
vamos tambem fazer a classe e extender o wrtible
class multiplyByTenStream extends Writable {
    _write
}
colocamos o metodo write la dentro e ess metodo recebe tres parametros chunk encoding e callback

o chunk é o pedaço que a genteleu na stream de leitura; ou seja o que esta no .push.
encoding é como essa informação eta codificada callback é a função que a stream de escrita precisa chamar quando ela terminar de fazer o que ela precisa com essa informação.
dentro de uma stream de escrita a gente não retorna nada. ela processa o dado. ela nunca transforma o dado em outra coisa, ela so processa.
então vamos colocar ela pra escrever no console.log
vamos pegar o chunk que é o buffer o chunk = this.push(buff) da função anterior, precisamos converter ele em uma string com o .toString() vamos colocar tudo dentro de um number para transformar essa string em um numero. e depois vamos multiplicar tudo por10 depois disso chamamos a callback pra demonstrar que encerrou. o encoding por enquanto não usamos. . fica assim:
class multiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback() 
    }
}
agora no lugar do pipe ao invez do stdout a gente vai colocar uma new multiplybytenstream() fica assim:

class multiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback() 
    }
}


new OneToHundredStream()
.pipe(new multiplyByTenStream())

# stream de transformação
essa stream funciona para transformar um chunk em outro.
vamos criar uma para transformar todo o numero em numero negativo.
vamos importar o transform e fazer a classe, o parametro transform recebe os mesmos do wrtite chunk encoding callback
class InverseNumbersStream extends Transform {
    _transform(chunk, encoding, callback)
}
a diferença é que agora ao inves de um console.log e mudar o dado como eu quiser a gente vai pegar o dado com uma const. fica assim para transformar em negativo
 _transform(chunk, encoding, callback) {
    const transformedNumber = Number(chunk.toString()) * -1
}
agora quando chamarmos o callback vamos enviar para ele como primeiro parametro o null isso para representar o erro, caso tenha um erro ele vai retornar nulo o segundo parametro é o transformado. então vamos colocar o transformedNumber como um buffer e como string.
fica assim:
class InverseNumbersStream extends Transform {
    _transform(chunk, encoding, callback) {
    const transformedNumber = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformedNumber)))

}
}

agora la na nossa chamada a gente vai colocar um novo pipe antes do pipe do write para ele primeiro usar o transformed. ou seja é uma conexão que fazemos antes.
a stream de leitura ela le dados, a de escrita escreve dados. a de transformação precisa ler dados e escrever. porque para transformar vc tem que ter a materia prima e tem que devolver algo.

tem o ulimo tipo de stream que é a duplex que pode servir tanto para leitura quanto para escrita.
podemos pensar em uma streamduplex como sendo um aquivo do nosso sistema. se a gente abre um novo file a gente pode tanto escrever quanto ler ele.
mas néao necessariamente podemos transformar algo nele.

na pasta de stream vamos criar um servidor http a parte para poder conectar o que a gente viu de steramcom os conhecimentos de http. nesse arquivo vamos criar um servidor http:
import http from 'node:http'

const server = http.createServer((req, res) => {
    
})
sever.listen(3334)
feito isso vamos criar outro arquivo chamado fakeuploadtoserver.
e nele vamos criar uma requisição ficticia, como se fosse o frontend chamando uma requisição pesada que precisa ser enviada ao backend.
vamos copiar o oneToHundredStream nesse novo arquivo.
o node ja suporta a fetch api nativamente. então podemos utilizar a fetchApi para lidar com requisições de um endereço para outro.
então no fim do arquivo fake vamos chamar a fetch de tro dela passamos o endereço do backend e no segundo arguento enviamos o metodo post porque para simular que estamos enviando uma informação aos poucos a stream so vai ser enviada por metodo post ou put, os outros medotos vao ser para um backend que vai dar write. e no body que é o conteudo da requisição vamos passar a new oneToHundredStream(). 
fica assim:
 fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
  })

  agora vamos no nosso servidor http e vamos copiar a inverse do e colocar ela antes da const server. 
  agora dentro do server a gente vai pegar a req que é uma stream tambem. a gente pode pensar no req como uma readeble stream e o res como uma writable stream.
  vamos dar um console.log na nossa inverseStream pegando a variavl transform.
  agora dentro do nosso server a gente vai fazer um return.
  pegar a req dar um pipe nela e esse pipe vai encaminhar a requisição para passar pela nossa função de inverse. e depois damos outro pipe para reencaminhar ela para a nossa resposta.
  em outras palavras, da no mesmo de fazer isso:
  new OneToHundredStream()
.pipe(new InverseNumbersStream())

so que ao invess de criarmos as streams de leitura e escrita a gente ta usando as stream ja criadas pelo node.
a pagina fica assim:
import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumbersStream extends Transform {
    _transform(chunk, encoding, callback) {
    const transformedNumber = Number(chunk.toString()) * -1
    console.log(transformedNumber)
        callback(null, Buffer.from(String(transformedNumber)))
}
}

const server = http.createServer((req, res) => {
return req
.pipe(new InverseNumbersStream())
.pipe(res)
})
server.listen(3334)

agora  gente executa o nosso server, para ele escutar a porta 3334 e em outro terminal executamos tambem o nosso fake upload to server.
a partir das novas atualizações do node precisamos adicionar o duplex tambem. então fica assim:
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half',
  })

  com eses codigos rodando o que acontece é que o fakeupload abre uma conequão atravez da requisião e ela não fecha. essa conexão continua em stream e nosso server vai computando ela enauqnto ela vai chegando.

  # consumindo completamente
  em alguns casos eu vou querer consumir todos os dados da stream antes de começar a processalos.
  para fazer isso existe uma sintaxe especifica para trabalhar com isso dentro do node.
  vamos criar um array e chamar ele de buffer
  const buffer = [  ]
a gente percorre a stream populando o buffer, e depois a gente trabalha com o array de forma completa. em outras palavras, a gente continua recebendo a stream aos poucos, mas a gente armazena cada pedaço em um array, e quando estiver completo nos vamos usar o array inteiro.
acredito que podemos fazer isso tambem para alguns arquivos mais pesados, onde nos poderiamos armazenar por exemplo 30% do arquivo antes de iniciar o trabalho com ele. a fim que uma vez que o trabalho seja iniciado ele seja mais provavel de ser continuo e não fique sendo interropido sempre para esperar o proximo chunk. eu disse isso com exemplo dos videos, que geralmente carregam uma parte antes de começar a tocar, assim nosso sistema vai estar processando alguns segundos ou minutos a frente do que o usuario esta vendo.
como vamos fazer isso? (antes vou criar um novo arquivo chamado buffer e nele colocar nosso array.:)
import http from 'node:http'


const serverHttp = http.createServer((req, res) => {
    const buffer = []
})


vamos percorrer a nossa stream de requisição, para isso nos podemos usar o for junto com await. usar o await dentro de uma stream faz aguardar cada pedaço da stream ser retornado. entéao podemos pegar a const chunk of req e com isso dar um push no array buffer:
const serverHttp = http.createServer(async (req, res) => {
    const buffers = []
    for await (const chunk of req) {
        buffers.push(chunk)
    }
})

esse await não vai permitir que nada execute durante o carregamento da stream. no final quando tudo estiver captado. temos que colocar o async tambem porque sempre que usamos o await precisamos definir que a função é assincrona.
apos que estiver terminado o buffer nos vamos ver o conteudo completo. vamos dar um    const fullStreamContent = Buffer.concat(buffers).toString()
sabendo que esse Buffer com maiusculo é um elemento do node não confundir com o nosso array que é buffers com minusculo e s que esta sendo passado para o Buffer.concat para que ele seja unido todas as pequenas partes que foram armazenadas no array. 
apos isso damos un console.log(fullStreamContent) e retornamos tambem um res.end(fullStreamContent).
no fim damos um server.listen(3335) a porta que para onde vamos mandar nossa requisição.
fica assim:
import http from 'node:http'


const serverHttp = http.createServer((req, res) => {
    const buffers = []
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)

    res.end(fullStreamContent)
})

serverHttp.listen(3334)
//mesma porta do streamHTTPSERVER, não podemos rodar as duas ao mesmo tempo.

vaos voltar no nosso fakeUploadToServer e fazemos depois do fetch um .then(response =>{
    reponse.text().then(data => {
        console.log(data)
    })
})
ou seja depois do fetch nos vamos pegar a resposta que o fetch troxe, transformar ela em texto. e essa resposta da trasnformação de texto (que vamos chamar de data, nos vamos dar um cosole.log(data))
na função do fakeUpload vamos reduzir a contagem para não termos que esperar até cem.

ao rodar os dois programas ele vai esperar o tempo para o stream enviar todos o seu conteudo e depois ele vai mostrar isso de uma vez no console.log

a vantagem de fazer esse tipo de sistema é que alguns arquivos tem metadados espalhados em varios pontos de seus conteudos, então nos não conseguiriamos reproduzi_los corretamente antes de carrega_los completamente. um dos tipos de dados que é muito dificil de consumir por partes é o formato de json, então esse tipo de operação se torna muito necessaria no nosso dia a dia.

 # corpo e requisição em JSON
 vamos usar o que aprendemos para consequir receber dados no nosso servidor http para colocar dados no nosso banco de dados.
 baixei o imnsomnia com ele vamos fazer requisiçoes de forma mais simles.
 vamos rodar a nossa aplicação src/server.js
 no insomnia nos vamos no canto superior direito e criar um novo colection
 nessa colection que chamamos de fundaments vamos criar uma nova requisição
 vamos colocar como post e no endereço o endereço do server localhost 3333/users
 que é o endereço para postar users.
 se a gente mandar a requisição ele retorna um 201 dizendo q foi criado.
 vamos ducplicar essa requisição e mudar o nome para list users e mudar o metodo para get. assim ao enviar vamos ter a lista dos usuarios que ele criou.
 porem nosso usuario esta hardcode la no nosso server, então se a gente mandar varios post ele sempre vai criar o mesmo funcionario.
 no insomnia podemos ver que no copro da requisição existem varios formatos que podemos enviar nesse corpo.vamos escolher json e passar um objeto nesse objeto vamos setar o nome e o email do usuario.
 {
	"name": "iuri reis",
	"email": "iuri@reis.com"
}

agora dentro do server vamos utilizar do conceito de buffer para fazer a adaptação do que enviamos na requisição para completar o usuario.
vamos no server:
pegamos a mesma logica de fazer buffer e aplicamos la com o corpo de nossa requisiçãoq ue vai vir no req. fica assi:
const server = http.createServer(async(req, res)=>{
    const {method, url} = req

    const buffers = []
    for await (const chunk of req){
        buffers.push(chunk)
    }

    const body = Buffer.concat(buffers).toString()
    console.log(body)
    
se a gente voltar no insomnia e der um send ele vai mostrar no log os dados que enviamos. mas ainda não estamos armazenando isso no users e eles estão como texto e não como objeto. então vamos tentar converter isso em json. vamos la no body e damos um json.parse
const body =JSON.parse( Buffer.concat(buffers).toString())
agora que ja temos acesso ao body comoum objetso em json a gente pode no metodo de post fazer uma desestruturação e usar esses dados na hora de inserir o usuario. fica assim:
if (method === 'POST' && url === '/users') {
    const { name, email } = body
    users.push({
        id: 1,
        name,
        email,
    })

    ele vai pegar o name e oemail que vem do body.
    porem se usarmos o get vamos ter um erro porque o body json vai tentar executar mesmo quando o corpo da requisição estiver vazio (que é o caso do nosso get.) e ai teremos um erro. para evitar isso vamos fazer um try aplicando o body dentro do req e não mais como const try { 
        req.body = Buffer.concat(buffers).toString()
    } 
    caso de erro vamos adicionar um catch (que provavemente vai ser o erro por que o corpo veio vazio/)
    vamos dar um req.body = null
    fica assim:
    const server = http.createServer(async(req, res)=>{
    const {method, url} = req

    const buffers = []
    for await (const chunk of req){
        buffers.push(chunk)
    }

    try {
        req.body =JSON.parse( Buffer.concat(buffers).toString())
    }catch {
        req.body = null
    }
        
        no nosso post vamos trocar o body por req.body tambem.

* com isso usamos o conceito do buffer para mandar objetos em json para nosso server e armazenar eles em um banco de dados.

# buffer
o buffer é uma representação de um espaço na memoria do computador onde os dados são tratados de forma rapida, salva e le na memoria de maneira muito performatica.
o node usa isso porque é mais performatico ler uma informaão de forma binaria do que um texto uma string  que tem mais informação.
o buffer foi uma api criada no node especialmente pela incapacidade do javascript de trabalhar com dados binarios de maneira eficiente. hoje em dia ate tem a typedarray que existe mas néao é muito usada.
caso a gente crie um buffer
const buf = Buffer.from("ok)
e dermos um console.log nisso ele vai retornar <Buffer 6f 6b>
isso é um hexadecimal onde cada um representa uma letra.
ou seja o que a gente escreve esta representado em hexadecimal e depois convertido, como a memoria do computador so trabalha em dados binarios sendo salvo assim o compiutador consegue processar muito mais rapdio. se a gente colocar um console.log(buf.toJSON()) ele vai transformar isso em decimal e não mais em hexadecial, mas vai consitnuar em dados binarios e processando rapido.
isso tudo para explicar porque o buffer é usado para streams, a gente popula o buffer com streams e ele consegue processar isso muito rapido poraue ele não usa strings.

# midleware
agora que vamos dicionar mais fucnionalidades vamos começar a separar um pouco as partes de nosso server.js para não ficar muito confuso.
por exemplo a parte que consume o body da requisição pode estar em outro arquivo.
vamos copiar essa parte do codigo:
 const buffers = []
    for await (const chunk of req){
        buffers.push(chunk)
    }

    try {
        req.body =JSON.parse( Buffer.concat(buffers).toString())
    }catch {
        req.body = null
    }

    vamos criar em src uma pasta chamada midlewares
    nessa pasta vamos criar um arquivo chamado json.js
    e exportar ums função assicrona chamada json
    essa função vai receber o req e res do servidor.
    e vai executar esse codigo que copiamos.
    fia assim:
    export async function json (req, res) {
    const buffers = []
    for await (const chunk of req){
        buffers.push(chunk)
    }

    try {
        req.body =JSON.parse( Buffer.concat(buffers).toString())
    }catch {
        req.body = null
    }
}

agora la dentro do nosso server nos podemos chamar
json e importar ela do middleware e passar req e res como parametro.
assim : 
await json(req, res)
por ser uma função assincrona e ter um await nela nos vamos botar um await antes da chamada dessa função no server. colocamos o .js depois do json dentro da importação e ai vai fucnionar normalmente. isso porque usando o type modules ele precisa especificar o tipo do arquivo.
porque usamos o nome do middleware significa um interceptador.
é uma função que intercepta nossa requisição por poutro arquivo. eles sempre recebem como parametro o req e res, eles são tratados la dentro.
nos podemos aproveitar esse middleware para transformar todas as respostas do nosso backend em json então vamos pegar essa linha la do server:
res
    .setHeader('Content-type', 'aplication/json')
    a função fica assim:
    export async function json(req, res) {
    const buffers = []
    for await (const chunk of req){
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    }catch {
        req.body = null
    }

    res.setHeader('Content-type', 'aplication/json')
}

em um unico arquivo lifamos com a recepcçéao e com a resposta transformando ambos em json

essa linha que a gente corta do srver a gente substitui so por res

por enquanto nõ estamos salvando nossos dados em um banco de dados, que guardaria eles de forma mais pemranente, estamos trabalhando com um array de memoria, ou seja caso a gente reincie o servidor a gente perde tdo.
vamos criar um banco de dados completo baseado em arquivos fisicos.
# bando de dados JSON
então uma das fomras de salvar os dados para não perder caso o servidor reinicie é salvar os dados dentro de um qrquivo fsico, fora do server.ai quando nossa aplicação iniciar ela le esse arquivo e popula o banco de dados com os dados que ja existiam anteriormente, e sempre que a gente mudar algo a gente atualiza esse arquivo.
criamos um arquivo chamado database.js e uma classe chamada database.
então por enauqnto estamos fazendo duas operações de leitura e escrita dos usuarios.
mas gostariamos de poder salvar qualquer tipo de informação dentro dele e não so usuarios. entéao dentro dele vamos criar uma propriedade chamada database= { } ou seja essapropriedade é igual um objeto. dentro dese objeto database, teremos varios tipos de informações como  tabela de users, 
apos isso vamos criar o metodo insert e ele vai receber a tabela que queremos inserir e os dados. e tambem o metodo select que vai receber a tabela e ele vai retornar todos os dados dessa tabela.
fica assim:
export class Database {
database = {}

select(table) {

}
insert(table, data) {

}
}

vamos fazer o retorno do select
const data = this.database[table] ?? []
até o momento nos fazemos ele olhar o databese e procurar se existe uma tabela com o mesmo nome da tabela que o select receber como parametro. as interrogações significam que se não existir, ele retrna um array vazio.
depois disso damos um return data
na parte de inserir nos vamos verificar se aquele registro ja existe, se néao existir nos vamos criar um array
if (Array.isArray(this.database[table])) {
    this.database[table].push(data)
}
ou seja se ja exite um array inserido nessa tabela com o mesmo nome dessa tabela que recebemos, nos vamos apenas inserir nessa tabela que ja existe o nosso data
else {
    this.database[table] = [data]
}
se não vamos criar um novo array com a data.
e depois retornar o item que foi inserido(data)
o total fica assim:
export class Database {
database = {}

select(table) {
const data = this.database[table] ?? []

return data
}

insert(table, data) {
if (Array.isArray(this.database[table])) {
    this.database[table].push(data)
}else {
    this.database[table] = [data]
}
return data
    }
    
}

agora vamos aplicar esse banco de dados dentro do nosso server.
no lugar da const de users a gente cria uma const chamada database = new Database()(importado do nosso arquivo)
e agora onde a gente dava users.push a gente vai apagar e pegar a forma do objeto e configurar ele como uma constante chamada users assim
   const users = {
    id: 1,
    name,
    email,
}
e logo abaixo a gente vai executar um database.insert('users' , users)
o primeiro parametro é o nome da tabela, e o segundo é a informação que queremos inserir. o metodo post fica assim:
if (method === 'POST' && url === '/users') {
    const { name, email } = req.body
   const users = {
    id: 1,
    name,
    email,
}
database.insert('users',users)
    return res.writeHead(201).end()
}

no metodo get passamos o database.select('users') o select com o nome da tabela  e depois retornamos isso como resposta assim:
if (method === 'GET' && url === '/users') {
    database.select('users')
    return res
    .end(JSON.stringify(users))
}

com o codigo atualizado assim ele fucniona. porem se resetarmos o servidor perdemos os dados porque ainda não estamos salvando em arquivo fisico.

da forma que esta a gente criou o metodo insert e seletc para que so se possa mexer no database por esses metodos, ou seja um acesso controlado. porem do jeito que esta ainda conseguimos acesso ao nosso database por arquivos externos, se agente for no terminal e fizer Database.database nos vamos conseguir controlar o nosso banco de dados.
o node tem um sistema de propriedade e metodos privados.
então se colocamos um # antes do objeto database dentro do nosso arquivo database, ele fica privado. e o codigo continua rodando normalmente.

# persistencia no banco de dados
vaùos deixar o banco de dados persistente para que cada alteração nele se mantenha apos reinciarmos a aplicação.
para trabalhar com arquivos fisicos dentro do node precisamos importar o fs do 'node:fs' fs nesse caso significa fime stitem
nos temos duas opções. o fs, e o fs/promisses, o promisses funciona para trabalhar com o formato de asincronismi que são as promises, então podemos usar o .then etc.
 o fs normal precisamos usar callback.
 vamos usar o promisse
 porem o metodo promisse não tem os formatos de steraming. então se formos ler ou escrever stream a gente néao pode acessar o fs/promisse, porque néao teremos as opçéoes como creatStream/
 agora que temos o:
 import fs from 'node:fs/promises'

 vamos criar um metodo chamado #persist() {}
 e ai vamos escrever o banco de dados em um arquivo fixo. ele vai ser chamado toda vez qpos inserirmos algo no banco de dados. então nas nossa funcão antes do return data vamos chamar ele assim:
 this.#persist()
 dentro do metodo persiste vamos usar fs.writeFile('nome do arquivo.json') como esse tipo de arquivo vai estar sendo lido pelo node a gente passa logo ele como json.
e no segundo arumento usamos o json.stringfy para converter o banco de dados em uma estrutura json.
  #persist() {
    fs.writeFile('db.json', JSON.stringify(this.#database))
   }
o arquivo fica assim :
import fs from 'node:fs/promises'

export class Database {

    #database = {}

   #persist() {
    fs.writeFile('db.json', JSON.stringify(this.#database))
   }

select(table) {
const data = this.#database[table] ?? []

return data
}

insert(table, data) {
if (Array.isArray(this.#database[table])) {
    this.#database[table].push(data)
}else {
    this.#database[table] = [data]
}

this.#persist()
return data
    }
    
}
 e se a gente rdar o terminal agora e dar um post vamos criar o arquivo db.json dentro da raiz do nosso projeto com o nome do usuario que demos no post.
 isso acontece porque o node leva em conta o local  localstamos executando a aplicação como sendo o local para se salvr as coisas. se a gente executar a aplicação de dentro da pasta src ele salvaria o banco de dados ali.
 como resolver o problema do caminho
 a forma mais atual de fazer isso é a seguinte;
 antigamente a gente podia ter funções com o nome como dirName mas a partir do momento que usamos o type: modules essas funções não existem mais.
 como resolver issoa tuamente? vamos usar uma outra variedade global que existe que se chama import.meta. se a gente usar um import.meta/url  ele vai te retornar o caminho completo até o onde esta o arquivo em que esse import.meta.url foi escrito.

 vamos tambem usar o construtor com o new e uma classe interna do node chamada url para fazer o databasePAth. dentro da url nos podemos enviar 2 parametros:
 1 o nome do arquivo que queremos criar 
 2 o caminho remativo onde queremos criar esse qrauivo.(e aqui podemos usar o import.meta.url)
 vamos criar uma const
 const databasePath = new URL('db.json', import.meta.url)

 é bom saber que o primeiro parametro é como se fosse um comando para o cd tambem. se a gente comecasse ele com um ../db.json ele iria pegar o caminho do import.meta.url e voltar uma pasta.
 agora que temos o databasePath criado podemos passar ele como primeiro parametro do nosso writefile que ele ele vai criar o arquivo no lugar certo.
 o databasepath é declarado antes de abrir a função, ou seja fora dela. o arquivo completo fica assim:
 import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database {

    #database = {}

   #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
   }

select(table) {
const data = this.#database[table] ?? []

return data
}

insert(table, data) {
if (Array.isArray(this.#database[table])) {
    this.#database[table].push(data)
}else {
    this.#database[table] = [data]
}

this.#persist()
return data
    }
    
}

agora se a gente rodar o progtram e der um post independente de onde o programa estiver girando na past do app, a criação do database vai ser relativa ao endereço que definimos. no nosso caso continua sendo a raiz do projeto porque colocamos o ../ antes do db.json

agora que o arquivo ja esta persistenta falta apenas recupera_lo qo inicializarmos.
para isso vamos ciar uma função construtora.
constructor() {
    fs.readfile(databasePath)
}
no segundo parametro passamos qual encoding estamos usando. utf_8
depois disso um .then porque isso é uma promisse
ai depois a gente vai pegar o data => e colocar no this database. evamos pegar o json e dar um parse(data)
no catch da promisse que o erro seria o arquivo não existir nos vamos chamar o persist para ele criar o arquivo mesmo que vazio. o arquivo fica assim:
import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {

    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }

   #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
   }

select(table) {
const data = this.#database[table] ?? []

return data
}

insert(table, data) {
if (Array.isArray(this.#database[table])) {
    this.#database[table].push(data)
}else {
    this.#database[table] = [data]
}

this.#persist()
return data
    }
    
}

dessa forma a gente pode rodar o programa e reiniciar ele que o nosso banco de dados vai ficar salvo.

# id unico
da forma que esta nosso codigo todos us usuarios esão sendo criados com o id 1.
nos precisamos mudar isso para que os ids sejam unicos a fim de não gerar problema quando formos manipula-los.
existem varias formas de fazer isso, aqui vamos importar do node: crypto uma função chamada random UUDI.unique universal id um id unico universão. não interessa quantas essa função seja chamada ela sempre vai trazer um id diferente. esse id vai ser uma string.
na nossa const user a gente vai colocar essa função. a gente poderia tambem usar o math.random() mas isso ão é um id universão unico, então pode ocasionalmente dar erro um dia. por isso preferimos usar o UUID.
a importação fica assim:
import {randomUUID} from 'node:crypto'

e o metodo post no server fica assim:
if (method === 'POST' && url === '/users') {
    const { name, email } = req.body
   const users = {
    id: randomUUID(),
    name,
    email,
}

# separando rotas da aplicação
nos vamos precisar tratar com muitas rotas em nossa aplicação, ja temos duas mas poderiamos facilmente pensar em outra para deletar, outra para buscar um unico usuario e não uma lista, outras funcionalidades que não sejam so usuarios, etc. então para não ficar muitos ifs. vamos separar essas rotas.
no middlewatre vamos criar um arquivo chamado routes.js
dentro dele vamos exportar a const routes que vai ser um array, e dentro desse arry cada rota vai ser um objeto.
esse objeto vai ser composto do methodo que vai ser usado nessa rota (get, post, etc). o endereço que vamos chama nessa rota path: '/users'
e o que vai acontecer quando chamarmos essa rota que vai ser o handler (req, res) => { aqui vai a mesma coisa que escrevemos la na nossa rota}.
fica assim:
export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users =  database.select('users')
    return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const { name, email } = req.body
            const users = {
             id: randomUUID(),
             name,
             email,
         }
         database.insert('users',users)
             return res.writeHead(201).end()
        }
    }
]

agora vamos precisar importar algumas coisas nesse arquivo.
 o banco de dados sai do server e vai pra o routes.
 const database = new Database()
 fica antes e abrir o array.
 e importamos tambem o Database ai no routes
 e o random UUID tambem vai sair do server e ir para o routes.
 agora no server vamos mudar os nossos if.
 vamos apagar os ifs
 e vamos fazer um pouco diferente
 nos temos acesso ao metodo e a url no server que é o metodo e o ptah que nos fizemos no routes.
 qo entrar alguma requisição no server a gente vai verificar no array de rotas se existe algum registro que sej igual a requisição que estamos qo usuario pediu. vamos dar um 
 const route = routes.find(route => {
return route.method === method && route.path === url
})
isso vai fazer a gente percorer o array routes e achar uma rota onde o methodo seja igual o metodo pedido e o path seja igual ao url pedido pelo usuario.
agora vamos fazer a condicional para aplicar a rota
if (route) {
    return route.handler(req, res)
}
caso a gente encontre uma rota, vamos retornar o handler que é a função que criamos la no routes, passando o req e o res para ela.
agora nos usamos uma verificação unica para encontrar a rota correta, e o server fica mais limpo e a gente pode ir criando novas rotas la no routes.

# 3 formas do front end enviar informaç éoes
1 query parametres -( parametros nomeados que enviamos n endereç da requisição por exemplo www.teste.com/users?userID=1&age=18) o que vem depois da interrogação é o query rametres a chave é userID e a chave é 1 cada parametro informado tem uma chave e vamor. podemos usar mais parametros so colocar o & depois do valor e adicionar mais umparametro como ta no exemplo. eles são usados geramentre quando precisamos ter uma url stateFULL ou seja uma aplicação que depende de estados, ou seja vai mudando quando resetamos a aplicação, os parametros não ficam armazenados. vamos usar esses parametros com informações não sensiveis e que véao modificar a resposta que a url vai nos dar, como por exemplo filtros, paginação etc; geralmente os parametros não são obrigatorios
2 route parametres - parametros não nomeados que ficam na rota. www;teste.com/users/1 veja que o 1 faw auqse parte do endereço ele não tem interrogação nem nada, ele é um routeparametre, geralmente são usados para identificação de recurso. nesse caso chamando essa rota com o metodo get, a gente poderia entender que estamos buscando o usuario com id1. ele não precisa ter m nome porque o metodo http ja diz o que esse nome significa. se for delete, a gente entende que queremos deletar o user com id 1. para entender essa rota a gente faz uma combinação de recurso url e metodo, e com esss tresa gente consegu entender.
3 request body - não fica naurl, pode ser usado para envio de informações sensveis. geralmente um formulario, pode ser usado para envio de quantas informações a gente quizer. eles passam pela criptografia. 
sabendo desses conceitos vamos criar as rotas para edição e remoção do usuario.
# DELETE
vamos la em routes.js
criar um novo obeto. passar method delete para ele.
no path a gente pode usar um route parametr para idendificar um usuario especifico na aplicação. seria algo como path/users/ID porem se a gente fizer isso ou um numero, vai dar errado porque para conseguir chamar essa a gente vai ter que ir la no imnsomina e colocar o id na rota, so que o id é algo grande que foi gerado automaticamente, e nem sempre o usuario vai ter acesso a isso. esse parametro é dinamico, cada usuario tem um id diferete. precisamos de um id que seja dinamico.

# regex
vamos criar um gerador dinmico de caminhos das rotas para que ele possa interpretar o parametro dinamico.
a gente identifica esse tipo de parametro com : então sempre que a gente tiver na rota algo como /users/: significa que vamos ter um parametrodinamico. e vamos dar um nome para ela no caso id. mas para que esse id seja interpretado vamos criar uma regex.
vamos criar uma pasta no src chamada utils e dentro dela um arquivo chamado build-route-path
nela vamos fazer uma função que vai receber o path. e dentro dela vamos criar uma regex.
para criar uma regex vamos colocar essas duas barras e dentro delas vamos escrever algo
const routeParametersregex = /:()/ 
uma regex é uma expressão regular. é uma forma de encontrar textos que seguem um formato especifico dentro de um texto maior. 
const routeParametersregex = /:([a-zA-Z])+/ 
ou seja queremos encontrar no texto tudo que começa com : e depois dela queremos algo que tenha etras que podem ser maiusculas ou minusculas e que vao de a a Z e eas podem se repetir uma ou mais vezes por conta do simbolo de +
exite umaextenção chamara regex previw que a gente pode usar para ir testando os regex.
de qualquer forma assim ele vai identificar um parametro, mas caso a gente tenha dois parametros dinamicos ele não identifica os dois. então temos que colocar um g para identificar que ela é global   fica assim:
/:([a-zA-Z]+)/g

exite um metodo de javascript chamado matchAll() que ele vai fazer uma busca pelo parametro e ver se bate na regex. mas ele volta um tipo de informação que não da pra ler por isso colocamos um Array.from por volta dele. fica asim
console.log(Array.from(path.matchAll(routeParametersregex)))
vamos usar esse console.log para verificar se esta fucnionando.

agora na nossa routes a gente vai colocar o buildRoutePath por volta de todos os paths fica assil:
 path:buildRoutePath( '/users'),

[]
[]
[ [ ':id', 'd', index: 7, input: '/users/:id', groups: undefined ] ] 
eu recebo isso acima no console.log. ou seja para os metodos get e post que não tem os :id ele devolve um array vazio. mas para o metodo delete que tem o id ele retorna o id um d o index o input e o grpous

O qu nos queremos agora é trocar o id que pode vir como dinamico por outra regex que pode vir com valor nesse campo.
vamos criar uma outra constante chamada path with parms
e nela vamos pegar o path e dar uma replaceall passando a regex como primeiro parametro, com isso vamos encontrar na regex todos os locais onde da match. e vou substituir por uma string colocando ela no segundo parametro. essa string vai ser outra regex. que vai ser nes=ssa formatação indicando o que podemos incluir de texto no parametro dinamico, letras de a a Z numeros de 0 a 9 hifen e underline(que precisam de barra invertida na frente) e colocamos o + para significar que podemos ter 1 ou mais caracteres.
fica assim:
const pathWithParams = path.replaceAll(routeParametersregex, '([a-z0-9\-_]+)')
isso acima vai transformar o nosso path de /users/:id para um /users/:[a-z0-9\-_]+
ou seja ele ja vai entender qualquer coisa dentro desses caracteres como valido.

agora fazemos uma nova regex chamando de pathRegex nela damos um new RegexExp e para isso passamos uma interpolação dizendo que nossa url precisa começar com a pathwithparams usamos o sinal de ^para dizer que começa. fica assim:
const pathRegex = new RegExp(`^${pathWithParams}`)

agora podemos retornar a pathRegex, mas ainda vamos fazer algumas outras alterações.

até o momento no server para validar as rotas a gente via se o metodo era igual e se o url era igual ao path. mas agora vamos mudar isso, toda a regex tem um metodo chamado test. que retorna true ou false caso a string que a gente passe seja valida naquela regex. então nos vamos passar o route.path.test(url) dentro do test a gente passa a nossa url para o regex testar.
com isso ja estamos identificando os parametros dinamicos e se usarmos os ids que criamos ele vai funcionar. o que precisamos fazer agora é que dentrodo codigo o dado do id gerado.
para isso vamos la no server, dentro do if(route) vamos fazer uma const para que a req url seja igual ao route.path assim;
const routParams = req.url.match(route.path)
nos vamos executar a regex na nossa url paraque ela te diga quais os dados que ela executou em nossa rota. ou seja o que ela encontrou.
agora el ja consegue identificar o id do usuario pelo parametro da rota. porem se a gente colocar varios routeparams como o id do usuario e do grupo vai ficar confuso. porque eles não dão os nomes dos dados. então nos podemos noemar os grupos na regex. dentro da regew dentro dos parenteses eu posso colocar um ?<tudo que escrever qaui vai ser o nome do grupo>
porem lembra que quando a gente fez o primeiro regex ela buscava o nome do campo
[ [ ':id', 'id', index: 7, input: '/users/:id', groups: undefined ] ] 
aqui temos id como primeiro. se dentro das chaves da interrogação a gente colocar um $1 ele vai trazer esse nome do campo para o nosso identificador do parametro.
usando isso se a gente der varios parametros de /id/groupId. ele vai acabar identificando todos pelo nome.
[   
  '/users/e71e75a9-4ecf-4fa3-845f-6dab6a5ae68b',
  'e71e75a9-4ecf-4fa3-845f-6dab6a5ae68b',
  index: 0,
  input: '/users/e71e75a9-4ecf-4fa3-845f-6dab6a5ae68b',
  groups: [Object: null prototype] {
    id: 'e71e75a9-4ecf-4fa3-845f-6dab6a5ae68b'
  }
]
podemos ver qaui que ele acha nos grupos um objeto e dentro dele tem o id.

# remoção de usuario
com isso vamos utilizar o group para poder eliminar o usuario.
vamos fazer uma const para capturar o groupo
vamos fazer isso criando um novo objeto e copiando tudo que tem dentro apenas porque ele da um object null prototype antes de mostrar o groups como pode ser visto acima. com isso ele vai parar de fazer isso.
e vamos usar req.params, ou seja substituimos o const params por req.params. porque como o req esta sendo passado para frente e a gente tem acesso a le na rota delete. fica assim.
if (route) {
    const routParams = req.url.match(route.path)
   req.params = {...routParams.groups}
    return route.handler(req, res)
}

e agora la na rota delete a gente ja tem acesso ao req.params que é igual ao id.

agora la no banco de dados database.js e depois de todos os metodos nos vamos criar o metodo chamado delete (table, id) ele ecebe a table e o id
precisamos pesquisar se a informação existe no banco de dados então vamos dar um this. #database(table ) e porcurar nela pra achar um index onde o row id seja igual ao id que vamos receber. fica assim:
 delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
    }
    a gente percore a tabela em questão e ve se tem algo no campo id que é igual ao id que informamos se isso existir ele vai retornar qual é o index dessa informação no array desse registro. caso ele não encontre ele vai retornar -1. com base nisso podemos fazer nossas if
    se for maior do que menos 1 ou seja se existir o usuario com esse index, nos vamos nessa tabela dentro da database e vamos dar um splice ou seja remover do array a posição do index que é o rowIndex, e uma so posição, para ele não sair removendo varias a partir do row index. apos isso vamos persistir o banco de dados. fica assim:
    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
        if (rowIndex >-1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    agora vamos na nossa rota e vamos pegar o id la do req.params e tambem vamos mandar o database deletar da tabela users esse id dentro do metodo delete. no return vamos colocar tambem um writeHead para que ele escreva o 204 como retorno. (204 ) significa sucesso porem sem nenhum conteudo. o metodo fica assim:
     method: 'DELETE',
        path:buildRoutePath( '/users/:id'),
        handler: (req, res) =>{
            const id = req.params.id
            database.delete('users',id)
            return res.writeHead(204).end()
        }

# PUT 
vamos fazer o metodo put para atualização do usuario, é o put porque vamos atualizar todos os dados de uma vez.
nas rotas vamos criar a rota put
nessa rota vamos fazer a co,figuração padraõ como as outrase vou pegar o nome e email que é o que podemos atualizar, de dentero do body assim:
const {name, email} = req.body
agpra dentro do banc de dados vamos criar uma função
ela vai ser muito parecida com a função delete então vamos copiar ela e modificar algumas coisas o nome vamos dar update vamos receber tambem o data alem dpo table e do id. e vamos tambem ter o rowindex igual o delete e no lugar do splice que remove os dados a gente vai dar uma substituição fazendo que é igual a data enviando o id, ou seja vamos substituir todos os dados. fica assim
update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
        if (rowIndex >-1) {
            this.#database[table][rowIndex]= {id, ...data}
            this.#persist()
        }
    }

    agora voltamos para o routes no metodo put colocamos o database.update e passamos no terceiro parametro um objeto com as informações que queremos enviar no caso o nome e o o email fica assim:
      method: 'PUT',
        path:buildRoutePath( '/users/:id'),
        handler: (req, res) =>{
            const id = req.params.id
            const {name, email} = req.body
            database.update('users',id, {name, email,})
            return res.writeHead(204).end()
        }
    }

    # filtros
    no caso de uma busca por exemplo como algo assim
    http://localhost:3333/users?search=iuri
    nos precisamos ser capazes de acessar o query seacrh e o valor da mesma forma que fomos de acessar o routeparams
    temos que voltar ma no buildroutepath
    nos vamos no nosso path regex e apos a verificação que ja estava setada nos vamos criar um novo grupo com (?<>) e como nome vamos dar query e ai vamos dizer que o qyery é opcional para dizer que é opcional nos temos que colocar ponto de interrogaçéao apos os parenteses assim(?<query>)?$ e botamos o cifrão para simbolizar que a url precisa terminar com esse query . o nosso query sempre começa com ? como podemos ver no exemplo que demos apos o users. então precisamos escapar o ponto de interrogação. para isso colocamos \\? apos isso o parenteses para pegar o conteudo que vem apos ponto de interrogação.e la dentro vamos colocar .* para simbolizar que pegamos tudo que vem apos o ? , o . significa qualquer caracter e o asterisco inumeras vezes.
    fica assim:
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    agora se a gente mandar uma req get com o search iuri ele vai devolver no groups o querry search=iuri
    agora vamos fazer outo arquivo no utils chamado extract-query-params.js
    nele vamos criar essa função recebendo o query
    export function extractQueryParams (query) {
    
}
dentro dela vamos fazer um return e retirar o primeiro caracter .substr(1) porem temos que tratar os casos em que podemos ter mais de um parameto separados por & como por exemplo search=iuri&page=2
para isso damos um split no & e transforma isso em um array com duas strings uma com cada parametro. e depois disso usamos o metodo reduce. começamos ele com o objeto vazio. para transformar o array el um objeto e vamos passar para o reduce os quertyparams e cada param que é as strings. dentro do reduce a gente vai dar um split no = para dividir o valor e o query e com isso vamos desestrutirar o array e colocar uma key e um value , assim pegamos a primeira posição antes do = por exemplo name e a segunda posição por exemplo iuri.
ai para formar o objetdo damos um queryParams[key] = value fica assim:
export function extractQueryParams (query) {
    return query.substr(1).split('&').reduce((queryParam, param)=> {
const [key, value] = param.split('=')
queryParam[key] = value
return queryParam
    }, {})
}

se agora a gente na server dar um extractQueryParams(routeParams.groups.query) ele vai dar o search: iuri e todos os outros tipos de chamadas
agora vamos mudarum pouco a logica do nosso if no server.
ele esta atualmente assim:
if (route) {
    const routParams = req.url.match(route.path)
   req.params = {...routParams.groups}
    return route.handler(req, res)
}

nos vamos separar duas variaveis.
query do routeParams.groups
e todo o resto vamos botar em uma variabel chamada params fica assim
const {query, ...params} = routParams.groups
e vamos transformar o req.params nesses params que a gente especificou. fica assim
req.params = params
e a req.query vai ser o extractQueryParams(query)  sendo esse query o que nos tiramos de routesParams.groups.
apenas para o metodo não retornar undefined caso não tenha nada vamos fazer uma terciaria dizendo que se o query estiver vazio ele retorna um objeto vazio. dessa forma
req.query = query ? extractQueryParams(query) : {}
se query existir ele var o extractqueyparams se não um objeto vazio.
agora salvo voltamos para as rotas e no get coloco um console.log do req.query ele me da o resultado disso.

agora no metodo select vamos permitir um segundo parametro chamado search

select(table, search) {
const data = this.#database[table] ?? []

return data
}
e dentro dele vamos vaer um if o search extiver preenchido. vamos fazer o data ser igual a data.filter() para filtrar ele como nos vamos alterar o valot de data é importante que a gente mude o const do data para uma let. no filter a gente vai definir row para percorrer todas as linhas.fica assim:
select(table, search) {
let data = this.#database[table] ?? []

if (search) {
    data = data.filter(row =>{
        
    })
}

return data
}

por enquanto inacabado. 
voltamos para as rotas e n get a gente pega o search do req.query.
e no parametro da busca em users a gente envia um objeto e nele vamos especificar o name: search
email: search
assim vamos pesquisar o query tanto no name quanto no email
fica assim:
  method: 'GET',
        path:buildRoutePath( '/users'),
        handler: (req, res) => {
            const { search } = req.query
            const users =  database.select('users', {
                name: search,
                email: search,
            })
    return res.end(JSON.stringify(users))
        }

        voltamos para o database.
        dentro do filter vamos converter o objeto em um array convertendo ele assim:
        return Object.entries(search)
        para podermos usar metodos do array nele. vamos usar o metodo some. que é um metodo que percorre e se pelo menos uma das vezes que percorrido for true o item do array deve ser incluido no filtro.o object.entries cria um array com um array para cada entrie por exemplo vai ficar
        [['name', iuri], ['email', 'iuri']]
         agora no some podemos pegar a chave e valor que vai sr o name/email e o iuri
         fica assim:
         if (search) {
    data = data.filter(row =>{
        return Object.entries(search).some(([key, value]) => {
            
        })
    })
}
ai de dentro do some vamos retornar se de cara row na key inclui o valor. ou seja se no nome e emailtem algum valor fica assim:
if (search) {
    data = data.filter(row =>{
        return Object.entries(search).some(([key, value]) => {
            return row[key].includes(value)
        })
    })
}

return data
}

e com isso a gente ja consegue ter uma resposta correta na busca.
porem no nosso metodo nos estamos criando um objeto mandando name  email
o que faz que se a gente não enviar o parametro não traz nada
para mudar isso ao invez de mandar o name e email vamos mandar o esse objeto caso exista algo dentro de search assim se não enviamos um nulo assim:
    const users =  database.select('users', seach ? {
                name: search,
                email: search,
            }: null)

            agora no database a gente pode fazer algo para ele considerar nõa considerar as maisuculas assim assim
               return row[key].toLowercase().includes(value.toLowercase())
               ai ele vai considerar o texto do query quanto o texto que estamos buscando todo em caixa baixa.

    agora a aplicação esta terminadae funcionando.




