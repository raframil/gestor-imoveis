# Gestor Imoveis
Sistema para Controle de Vendas de Imóveis


## Como executar o projeto

1. Tenha instalado e configurado em sua máquina o Node (https://nodejs.org/en/download/) e o Angular CLI (https://angular.io/guide/setup-local).
2. Clone este repositório em sua máquina

### Configurando o servidor

1. Abra a pasta "server"
2. Abra um terminal nesta pasta
3. Execute o comando ```npm install``` para instalar as dependências do projeto
4. Clone o arquivo ```.env.example``` no mesmo diretório e defina-o como ```.env```
5. Configure o arquivo ```.env``` com a porta (por padrão, deixe a 3000) e defina a URL do MongoDB (remota ou de sua máquina)
6. Execute o comando ```npm run dev``` e verifique se o servidor inicializou corretamente
7. Você pode abrir no navegador o endeeço ```localhost:3000/healthcheck``` para verificar se a API está online


### Configurando o front (Angular)

1. Abra a pasta "web"
2. Abra um terminal nesta pasta
3. Execute o comando ```npm install``` para instalar as dependências do projeto
4. (opcional) Se você alterou a porta no passo anterior, precisará alterar o arquivo "environment.ts" com a nova apiUrl para funcionar
5. Execute o comando ```ng serve``` e verifique se o projeto inicializou corretamente
6. Acesse localhost:4200