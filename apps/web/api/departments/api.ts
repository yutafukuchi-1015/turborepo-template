import { client } from "@/server/src";

export const useDepartments = async () =>
  await (
    await client.departments.$get(undefined, {
      fetch: () =>
        fetch(client.departments.$url(), {
          method: "GET",
          cache: "no-store", // SSR
        }),
    })
  ).json();
