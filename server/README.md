1) .env.exaple replace on .env; add your database mysql data in DATABASE_URL; my MYSQL version 5.7
2) install packages: npm i
3) run migrate: npx prisma migrate dev --name init
4) run seeds with marvel api: npm run seeds
5) run dev server: npm run start:dev