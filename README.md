## HOW TO START

### /package/db

```
cd ./package/db
cp .env.example .env
.envのDB_URLの中身を記載
docker-compose up -d
bun push
```

### /root

```
pnpm i
pnpm run dev
```

## SCRIPTS

### /apps/web

After `bun generate-api`, script generate api call fn.

### /package/db

After `bun pull`, script generate schema table from postgresql.

## TEST
### /apps/web

1. `pnpm run storybook`
2. `pnpm run playwright--ui`
