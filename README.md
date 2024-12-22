1. cd ./package/db
2. docker-compose up -d
3. bun push　(migrate)
4. bun ./src/index.ts (seed.現状はseed injection codeは消している)
5. pnpm run dev (root配下で)
