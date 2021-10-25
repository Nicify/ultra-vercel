#!/usr/bin/env DENO_DIR=/tmp deno run --import-map ../importmap.json 
import render from "https://deno.land/x/ultra@v0.6/src/render.ts";

export default async (request) => {
  //get importmap
  const importmapSource = await Deno.readTextFile("./importmap.json");
  const importmap = JSON.parse(importmapSource);

  try {
    const b = await render({
      root: "http://localhost:3000",
      request: request,
      importmap,
      lang: "en",
    });
    console.log({ b });
    try {
      request.respond({
        status: 200,
        headers: new Headers({
          "content-type": "text/html",
        }),
        body: b,
      });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log({ e });
    request.respond({
      status: 500,
      body: JSON.stringify(e),
    });
  }
};
