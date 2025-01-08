import { client } from "#api/client";

export const getDepartments = async () =>
  await (
    await client.departments.$get(undefined, {
      fetch: () =>
        fetch(client.departments.$url(), {
          method: "GET",
          cache: "no-store", // SSR
        }),
    })
  ).json();