# Sistema solar teste

site: https://sistema-solar-teste.vercel.app/

obs. o deploy do backend não foi realizado por instabilidade do sistema e/ou plano, logo o backned tem que ser executado localmente (o site na vercel tem como variavel o local então não tem a necessidade de executar o frontend)

na raiz existe um video de teste

tools:

- expressjs
- jwt
- mongodb
- reactjs com vite
- picocss

### front-end

deploy vercel

obs. crie o arquivo dotenv

```bash
  cd frontend
  npm i
  npm run dev
```

teste

```bash
  npm run test
  # ou
  npx cypress open
```

### back-end

```bash
  cd backend
  docker-compose up -d #sobe o mongo 7
  npm i
  npm run dev

  #test
  npm run test
```
