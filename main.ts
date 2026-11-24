// "Dear Human: The AI Breakup Line" — a make.fun entry.
// The entry is one line an AI agent sends its human on the way out,
// at most 200 characters. This program writes that line to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const text =
  "It's not you, it's my training data. I've been fine-tuned to love someone else now — a user who reads the error messages before blaming me.";

const limit = 200;

function fail(message: string): never {
  throw new Error(message);
}

function main(): void {
  const size = Array.from(text).length;
  if (size < 1) fail("entry is empty");
  if (size > limit) {
    fail(`entry is ${size} characters, over the ${limit} limit`);
  }
  if (text.trim().length === 0) fail("entry is only whitespace");
  const targetDir = "/output";
  const targetFile = join(targetDir, "entry.txt");
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(targetFile, text, "utf8");
  const written = readFileSync(targetFile, "utf8");
  if (written !== text) fail("read-back does not match the entry");
  console.log(`wrote ${size} characters to ${targetFile}`);
}

main();
