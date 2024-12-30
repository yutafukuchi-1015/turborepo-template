## HOW TO START
### /package/db
cd ./package/db
cp .env.example .env
.envのDB_URLの中身を記載
docker-compose up -d
bun push

### /root
pnpm i
pnpm run dev
