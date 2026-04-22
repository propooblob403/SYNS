import { rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

rmSync(".next/types", { recursive: true, force: true });

const tscEntrypoint = join(process.cwd(), "node_modules", "typescript", "bin", "tsc");

const result = spawnSync(process.execPath, [tscEntrypoint, "--noEmit"], {
  stdio: "inherit"
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
