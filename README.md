# automob-REST

Projeto ultilizaedo como teste técnico da empresa SEIDOR.
Consiste em um aplicativo de gerenciamente de carros e motorista e alugueis de carros para motoristas

Pré-requisitos:
- Ter o nodeJS na versão mais atual instalada no PC
- Ter um servidor de MySQL up no momento da execução da aplicação

Para startar o projeto o seguinte passo a passo deve ser cumprido anteriormente:

- Abrir o comand na pasta raiz do projeto e executar o comando 'npm install'
- Criar o banco de dados da aplicação:
- O script do banco de dados da aplicação está na pasta 'documentation', e tem nome 'automobScrpt.sql'
- Nele contem todos os comando necessários para instanciar o banco de dados que a aplicação preisa
- A aplicação utiliza MySQL então é neessário que seja feito a execução dos comandos em uma interface que se comunique com um servidor MySQL
- No mesmo local que foi executado o priemiro passo deve ser exeutado o comando 'npm run app' e dessa forma a aplicação backend estará em funcionamento.

O start dos testes do projeto deve ser feito da seguinte forma

- Após a execução de todos os passos para o start do projeto, deve-se abrir o comand na pasta raiz do projeto e executar o comando 'npm run tests'
- Todos os testes irão ser testados e o resultado aparecerá na tela.



<h1>Rotas da API</h1>

<h3>Car</h3>
<p>Rota que faz o gerenciamento de todos os carros da aplicação</p>

<ul>
    <li>Listar</li>
        <ul>
            <li>Responsavel pela listagem de todos os carros</li>
            <li>Metodo: POST</li>
            <li>Rota: http://localhost:8000/automob/app/car/list</li>
            <li>Body da requisição:
                <code>
                {
                    "brand": STRING,
                    "color": STRING
                }
                </code>
            </li>
            <li>Retorna um objeto com um array de carros</li>
        </ul>
    <li>Listar Por Id</li>
        <ul>
            <li>Responsavel pela listagem de um carro especifico</li>
            <li>Metodo: GET</li>
            <li>Rota: http://localhost:8000/automob/app/car/$id$</li>
            <li>Retorna um objeto de carros</li>
        </ul>
    <li>Criar</li>
        <ul>
            <li>Responsavel pela criação dos carro</li>
            <li>Metodo: POST</li>
            <li>Rota: http://localhost:8000/automob/app/car</li>
            <li>Body da requisição:
                <code>
                {
                    "plate": STRING,
                    "brand": STRING,
                    "color": STRING
                }
                </code>
            </li>
            <li>Retorna um objeto informando se houve sucesso ou não</li>
        </ul>
    <li>Atualizar</li>
        <ul>
            <li>Responsavel pela atualização de um carro especifico</li>
            <li>Metodo: PUT</li>
            <li>Rota: http://localhost:8000/automob/app/car/$id$</li>
            <li>Body da requisição:
                <code>
                {
                    "plate": STRING,
                    "brand": STRING,
                    "color": STRING
                }
                </code>
            </li>
            <li>Retorna um objeto informando se houve sucesso ou não</li>
        </ul>
    <li>Deletar</li>
        <ul>
            <li>Responsavel pela exclusão de um carro especifico</li>
            <li>Metodo: DELETE</li>
            <li>Rota: http://localhost:8000/automob/app/car/$id$</li>
            <li>Retorna um objeto informando se houve sucesso ou não</li>
        </ul>
</ul>

<h3>Driver</h3>
<p>Rota que faz o gerenciamento de todos os motoristas da aplicação</p>

<ul>
    <li>Listar</li>
        <ul>
            <li>Responsavel pela listagem de todos os motorista</li>
            <li>Metodo: POST</li>
            <li>Rota: http://localhost:8000/automob/app/driver/list</li>
            <li>Body da requisição:
                <code>
                {
                    "name": STRING
                }
                </code>
            </li>
            <li>Retorna um objeto com um array de motorista</li>
        </ul>
    <li>Listar Por Id</li>
        <ul>
            <li>Responsavel pela listagem de um motorista especifico</li>
            <li>Metodo: GET</li>
            <li>Rota: http://localhost:8000/automob/app/driver/$id$</li>
            <li>Retorna um objeto de motorista</li>
        </ul>
    <li>Criar</li>
        <ul>
            <li>Responsavel pela criação dos motorista</li>
            <li>Metodo: POST</li>
            <li>Rota: http://localhost:8000/automob/app/driver</li>
            <li>Body da requisição:
                <code>
                {
                    "name": STRING
                }
                </code>
            </li>
            <li>Retorna um objeto informando se houve sucesso ou não</li>
        </ul>
    <li>Atualizar</li>
        <ul>
            <li>Responsavel pela atualização de um motorista especifico</li>
            <li>Metodo: PUT</li>
            <li>Rota: http://localhost:8000/automob/app/driver/$id$</li>
            <li>Body da requisição:
                <code>
                {
                    "name": STRING
                }
                </code>
            </li>
            <li>Retorna um objeto informando se houve sucesso ou não</li>
        </ul>
    <li>Deletar</li>
        <ul>
            <li>Responsavel pela exclusão de um motorista especifico</li>
            <li>Metodo: DELETE</li>
            <li>Rota: http://localhost:8000/automob/app/driver/$id$</li>
            <li>Retorna um objeto informando se houve sucesso ou não</li>
        </ul>
</ul>

<h3>Driving</h3>
<p>Rota que faz o gerenciamento de todos os alugueis de carros da aplicação</p>
<ul>
    <li>Listar</li>
        <ul>
            <li>Responsavel pela listagem de todos os alugueis feitos pelos motoristas</li>
            <li>Metodo: GET</li>
            <li>Rota: http://localhost:8000/automob/app/driving</li>
            <li>Retorna um objeto com um array de alugueis</li>
        </ul>
    <li>Criar</li>
        <ul>
            <li>Responsavel pela criação dos alugueis</li>
            <li>Metodo: POST</li>
            <li>Rota: http://localhost:8000/automob/app/driving/setInUse</li>
            <li>Body da requisição:
                <code>
                {
                    "idDriver": INTEGER,
                    "idCar": INTEGER,
                    "reason": STRING
                }
                </code>
            </li>
            <li>Retorna um objeto informando se houve sucesso ou não</li>
        </ul>
    <li>Finalizar</li>
        <ul>
            <li>Responsavel pela finalização dos alugueis</li>
            <li>Metodo: POST</li>
            <li>Rota: http://localhost:8000/automob/app/driving/serFree</li>
            <li>Body da requisição:
                <code>
                {
                    "idDriver": INTEGER,
                    "idCar": INTEGER,
                    "idDriving": INTEGER
                }
                </code>
            </li>
            <li>Retorna um objeto informando se houve sucesso ou não</li>
        </ul>
</ul>
