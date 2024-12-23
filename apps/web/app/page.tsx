"use client";
import React from "react";
import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return <Button onClick={() => router.push("/employees")}>/employees</Button>;
}
