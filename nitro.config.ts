import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  publicAssets: [
    {
      dir: "dist/client",
    },
  ],
  handlers: [
    {
      route: "/**",
      handler: "./dist/server/server.js",
    },
  ],
});
