const { execFileSync } = require("node:child_process");
const { mkdtempSync, rmSync, writeFileSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join } = require("node:path");
const { width, height, scene } = require("../assets/orbit-study.js");

function coordinates([x, y]) {
  return `${x.toFixed(3)},${y.toFixed(3)}`;
}

const drawing = ["scale 2,2", "stroke-linecap round", "stroke-linejoin round"];
for (const { origin, radius, points, fill, stroke, weight } of scene()) {
  drawing.push(`fill '${fill ?? "none"}' stroke '${stroke ?? "none"}' stroke-width ${weight ?? 0}`);
  if (origin) {
    const [x, y] = origin;
    drawing.push(`circle ${coordinates(origin)} ${coordinates([x + radius, y])}`);
  } else {
    drawing.push(`polyline ${points.map(coordinates).join(" ")}`);
  }
}

const staging = mkdtempSync(join(tmpdir(), "ai-lab-orbit-"));
try {
  const file = join(staging, "orbit-study.mvg");
  writeFileSync(file, drawing.join("\n"));
  execFileSync("magick", [
    "-size", `${2 * width}x${2 * height}`, "xc:none",
    "-draw", `@${file}`, "-strip", "-quality", "88",
    join(__dirname, "../assets/orbit-study.webp"),
  ], { stdio: "inherit" });
} finally {
  rmSync(staging, { recursive: true, force: true });
}
