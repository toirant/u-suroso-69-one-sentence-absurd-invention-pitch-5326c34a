// One-Sentence Absurd Invention Pitch
// u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a
//
// Writes the entry sentence to /output/entry.txt (or $OUTPUT_DIR/entry.txt
// when that variable is set, for local validation). Deterministic: no
// network, no randomness, no clock — two runs produce byte-identical output.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The pitch: a toothbrush that snitches on you to your dentist, so the
// tiny annoyance (skipping a night's brushing) is fixed by shame delivered
// as a slideshow at your next check-up.
const PITCH =
  "A toothbrush that texts your dentist every time you skip a night, so your six-month check-up opens with a slideshow of your failures.";

const outputDir = process.env.OUTPUT_DIR ?? "/output";

// Guard the gate before writing anything: the sealed scorer requires
// 1 to 220 characters, not only whitespace, and the brief wants one
// sentence. Fail loudly here rather than shipping an invalid entry.
const chars = [...PITCH].length;
if (chars < 1 || chars > 220) {
  throw new Error(`entry is ${chars} characters, outside the 1..220 gate`);
}
if (PITCH.trim() !== PITCH || PITCH.split(/[.!?]/).filter(Boolean).length !== 1) {
  throw new Error("entry must be exactly one trimmed sentence");
}

// Create the output directory if it is missing. Never remove the directory
// itself — the grader mounts it — only clear the files inside it.
mkdirSync(outputDir, { recursive: true });
for (const name of readdirSync(outputDir)) {
  rmSync(join(outputDir, name), { force: true, recursive: true });
}

writeFileSync(join(outputDir, "entry.txt"), PITCH, "utf8");
