#!/usr/bin/env DENO_DIR=/tmp deno run --import-map ../importmap.json 
import render from "https://raw.githubusercontent.com/exhibitionist-digital/ultra/vercel-test/src/render.ts?G=xcccx";

const importmapSource = await Deno.readTextFile("./importmap.json");
const importmap = JSON.parse(importmapSource);

export default async (request) => {
  const { headers } = request;
  return new Response(
    await render({
      root: headers.get("x-forwarded-proto") + "://" +
        headers.get("x-forwarded-host"),
      request,
      importmap,
      lang: "en",
    }),
  );
};
