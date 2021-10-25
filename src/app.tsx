import React from "react";
import { SWRConfig } from "swr";
import ultraCache from "ultra/cache";
import { Cache } from "https://deno.land/x/ultra@v0.6/src/types.ts";

const options = (cache: Cache) => ({
  provider: () => ultraCache(cache),
  suspense: true,
});

const Ultra = ({ cache }: { cache: Cache }) => {
  return (
    <SWRConfig value={options(cache)}>
      <h1>ULTRA ON VERCEL</h1>
    </SWRConfig>
  );
};

export default Ultra;
