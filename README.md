for client folder:
1) npm run start:vite

I'm use in this project:
1) library as such as react-hook-form, redux-toolkit(rtk-query), Mantine UI, React Router, Swiper, Framer Motion.
2) lint plugins: stylelint(for order style in scss modules), eslint, prettier
3) architecture FSD(Feature-sliced Design);

for server folder:
1) .env.exaple replace on .env; add your database mysql data in DATABASE_URL; my MYSQL version 5.7
2) install packages: npm i
3) run migrate: npx prisma migrate dev --name init
4) run seeds with marvel api: npm run seeds
5) run dev server: npm run start:dev