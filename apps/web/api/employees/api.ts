import { client } from "#api/client";

export const getEmployees = async () =>
  await (
    await client.employees.$get(undefined, {
      fetch: () =>
        fetch(client.employees.$url(), {
          method: "GET",
          cache: "no-store", // SSR
        }),
    })
  ).json();

export const getSingleEmployee = async ({ id }: { id: string }) =>
  await (
    await client.employees[":id"].$get(
      { param: { id } },
      {
        fetch: () =>
          fetch(client.employees[":id"].$url({ param: { id } }), {
            method: "GET",
            cache: "no-store", // SSR
          }),
      }
    )
  ).json();
