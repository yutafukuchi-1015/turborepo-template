import { Button } from "@repo/ui";
import { client } from "../../server/src/index";
import React from "react";

export default async function Home() {
  const res = client.v1.users.$get();
  const data = await (await res).json();
  console.log("ttttt");
  return (
    <>
      <Button>/vi/users post res is {data.message}</Button>
      <h1 className="text-3xl font-bold underline text-blue-700">
        Hello world!
      </h1>
    </>
  );
}
