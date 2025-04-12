# Sistema solar teste

site: https://sistema-solar-teste.vercel.app/

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

deploy railway

```bash
  cd backend
  docker-compose up -d #sobe o mongo 7
  npm i
  npm run dev

  #test
  npm run test
```
