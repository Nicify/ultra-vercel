import {
  copy,
  emptyDir,
  walkSync,
} from "https://deno.land/std@0.106.0/fs/mod.ts";
import transform from "https://raw.githubusercontent.com/exhibitionist-digital/ultra/master/src/transform.ts";

await emptyDir(".vercel_build_output");
await emptyDir(".ultra");

//get importmap
const importmapSource = await Deno.readTextFile("importmap.json");
const importmap = JSON.parse(importmapSource);

const transforms = { "jsx": true, "tsx": true };

for (const entry of walkSync("./src")) {
  const ext = entry?.path?.split(".").pop();
  if (transforms[ext]) {
    const source = await Deno.readTextFile(entry.path);
    const t = await transform({
      source,
      importmap,
      root: Deno.env.get("VERCEL_URL"),
    });
    console.log(entry.path);
    await Deno.writeTextFile(
      `${
        entry.path.replace(
          /.jsx|.tsx/gi,
          () => `.js`,
        ).replace(
          "src/",
          ".ultra/",
        )
      }`,
      t,
    );
  }
}

await copy("./src", "./.vercel_build_output/static");

for (const entry of walkSync(".ultra")) {
  if (entry.isFile) {
    await (copy(
      entry?.path,
      entry?.path?.replace(
        ".ultra/",
        ".vercel_build_output/static/",
      ),
    ));
  }
}

Deno.exit();
