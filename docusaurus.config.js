/** @type {import('@docusaurus/types').Config} */
module.exports = {
  // ...
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          routeBasePath: "/",
        },
        blog: false,
        theme: {},
      },
    ],
  ],
  baseUrl: "/",
  title: "Docs for next portfolio",
  url: "http://localhost",
};
