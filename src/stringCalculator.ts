/**
 * String Calculator implementation to satisfy the TDD test suite.
 *
 * Supported features:
 * - Empty input returns 0
 * - Default delimiters: comma (,) and newline (\n)
 * - Custom single-character delimiter via header: `//<delimiter>\n<numbers>`
 * - Throws on negative numbers with message: "Negatives not allowed: <negatives>"
 */

export function add(input: string): number {
  if (input === "") {
    return 0;
  }

  const { delimiter, numbersSection } = parseHeader(input);

  const separators = delimiter ? [delimiter, "\n"] : [",", "\n"];
  const tokens = splitByDelimiters(numbersSection, separators);

  const values: number[] = tokens
    .filter((t) => t.length > 0)
    .map((t) => Number(t))
    .filter((n) => !Number.isNaN(n));

  const negatives = values.filter((n) => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
  }

  return values.reduce((sum, n) => sum + n, 0);
}

function parseHeader(input: string): {
  delimiter: string | null;
  numbersSection: string;
} {
  if (input.startsWith("//")) {
    const newlineIndex = input.indexOf("\n");
    if (newlineIndex > 2) {
      const delimiter = input.slice(2, newlineIndex);
      const numbersSection = input.slice(newlineIndex + 1);
      return { delimiter, numbersSection };
    }
  }
  return { delimiter: null, numbersSection: input };
}

function splitByDelimiters(input: string, delimiters: string[]): string[] {
  const escaped = delimiters.map(escapeRegExp);
  const pattern = new RegExp(`(?:${escaped.join("|")})`, "g");
  return input.split(pattern);
}

function escapeRegExp(text: string): string {
  // Escape characters that have special meaning in regex
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
