🪐 Desafio Técnico – Sistema Solar Explorer
🎯 Objetivo
Desenvolver uma aplicação fullstack (API + Front-End) que permita aos usuários autenticados visualizar uma lista dos planetas do sistema solar, acessar detalhes de cada planeta e cadastrar planetas personalizados.

🧩 Funcionalidades obrigatórias
1. Autenticação
•	Implementar login com JWT ou OAuth2 (ex: login com Google).
•	Cadastro de usuário não é necessário.
•	Pode usar um único usuário fixo no banco de dados para fins de login.
•	O token JWT deve proteger todas as rotas autenticadas da API.

2. API (Backend)
Requisitos:
•	Linguagens permitidas:
o	C# (.NET Core)
o	Java (Spring Boot)
o	JavaScript/TypeScript (Node.js com Express ou similar)
•	Banco de dados obrigatório:
o	Pode ser relacional (PostgreSQL, MySQL) ou NoSQL (MongoDB)
•	Deve conter as seguintes rotas:
Rota	Método	Autenticada	Descrição
/login	POST	❌	Login e geração de JWT
/planets	GET	✅	Retorna a lista de planetas
/planets/:id	GET	✅	Retorna detalhes de um planeta
/planets	POST	✅	Cadastra um novo planeta personalizado
Dados esperados de cada planeta:
•	name (string)
•	diameter (número)
•	rotationPeriod (string ou número)
•	distanceFromSun (número)
•	hasRings (booleano)
•	imageUrl (string) → obrigatório
Os planetas do sistema solar devem ser pré-carregados no banco via script. Os personalizados devem ser armazenados normalmente no banco.

3. Frontend (React ou Vue)
Requisitos:
•	Tela de login
•	Tela de listagem de planetas (nome + imagem)
•	Tela de detalhes do planeta
•	Tela/formulário para cadastrar novo planeta
o	Campos obrigatórios (nome, diâmetro, período de rotação, distância do Sol, anéis, imagem)
o	Após cadastro, o novo planeta deve aparecer na lista
•	Tecnologias permitidas: React ou Vue (versão atual ou recente)

🛠️ Requisitos Técnicos
•	Frontend: React ou Vue
•	Backend: C#, Java ou Node.js com Express (pode usar TypeScript)
•	Banco de dados: obrigatório, com script de criação e inserção inicial
•	Autenticação: JWT ou OAuth2
•	Imagens dos planetas são obrigatórias (usar URL pública)

📦 Entrega
•	Projeto hospedado no GitHub
•	README.md com:
o	Instruções para rodar backend e frontend
o	Script de banco de dados (SQL ou JSON/BSON)
o	Informar credenciais fixas para login (se aplicável)
o	Link para deploy (se fizer o diferencial)

✅ Diferenciais (não obrigatórios)
•	Deploy em nuvem (ex: Vercel, Netlify, Render, Railway, Azure, AWS etc.)
•	Uso de TypeScript
•	Testes automatizados (unitários ou integração)
•	Organização de código por camadas (ex: controller, service, repository)
•	Upload de imagem real (ex: com armazenamento em nuvem ou serviço como Cloudinary)
•	Uso de variáveis de ambiente
