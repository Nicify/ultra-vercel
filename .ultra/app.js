import t from "https://esm.sh/react@18.0.0-alpha-4298ddbc5-20211023?no-check";
import { SWRConfig as o } from "https://esm.sh/swr@1.0.0?deps=react@18.0.0-alpha-4298ddbc5-20211023&bundle&no-check";
import e from "https://deno.land/x/ultra@v0.6/cache.js";
const a = (r) => ({ provider: () => e(r), suspense: !0 }),
  c = ({ cache: r }) =>
    t.createElement(
      o,
      { value: a(r) },
      t.createElement("h1", null, "ULTRA ON VERCEL"),
    );
export default c;
