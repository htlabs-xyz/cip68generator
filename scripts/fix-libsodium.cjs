const fs = require("fs");
const path = require("path");

const target = path.join(
  "node_modules",
  "libsodium-wrappers-sumo",
  "dist",
  "modules-sumo-esm",
  "libsodium-sumo.mjs",
);

const source = path.join(
  "node_modules",
  "libsodium-sumo",
  "dist",
  "modules-sumo-esm",
  "libsodium-sumo.mjs",
);

if (!fs.existsSync(target) && fs.existsSync(source)) {
  const rel = path.relative(path.dirname(target), source);
  fs.symlinkSync(rel, target);
  console.log("Linked libsodium-sumo.mjs");
} else if (fs.existsSync(target)) {
  console.log("libsodium-sumo.mjs already exists");
} else {
  console.log("Source not found, skipping");
}
