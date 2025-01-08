import { AppType } from "@/server/src";
import { hc } from "hono/client";

const apiUrl = process.env.API_URL || "http://localhost:8080/";
export const client = hc<AppType>(apiUrl);