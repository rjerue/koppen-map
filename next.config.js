const runtimeCaching = require("@imbios/next-pwa/cache");

const withPWA = require("@imbios/next-pwa")({
  dest: "public",
  runtimeCaching,
});

module.exports = withPWA({
  output: "export",
});
