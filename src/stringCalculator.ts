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
  // Fast path for empty input per requirements
  if (input === "") return 0;

  const { delimiters, numbersSection } = parseInput(input);
  const tokens = tokenize(numbersSection, delimiters);
  const values = toNumbers(tokens);

  validateNoNegatives(values);
  return sum(values);
}

/**
 * Parses the optional custom delimiter header and returns the delimiters and
 * the numbers section to be processed further.
 */
function parseInput(input: string): {
  delimiters: string[];
  numbersSection: string;
} {
  if (input.startsWith("//")) {
    const newlineIndex = input.indexOf("\n");
    if (newlineIndex > 2) {
      const customDelimiter = input.slice(2, newlineIndex);
      return {
        delimiters: [customDelimiter, "\n"],
        numbersSection: input.slice(newlineIndex + 1),
      };
    }
  }

  return { delimiters: [",", "\n"], numbersSection: input };
}

/**
 * Splits the input by any of the provided delimiters. Empty tokens are preserved
 * for now and handled in number parsing.
 */
function tokenize(input: string, delimiters: string[]): string[] {
  const escaped = delimiters.map(escapeRegExp);
  const pattern = new RegExp(`(?:${escaped.join("|")})`, "g");
  return input.split(pattern);
}

/** Converts tokens to numbers, skipping empty tokens and non-numeric values. */
function toNumbers(tokens: string[]): number[] {
  return tokens
    .filter((token) => token.length > 0)
    .map((token) => Number(token))
    .filter((value) => !Number.isNaN(value));
}

/** Ensures there are no negative numbers; throws with a detailed message if any. */
function validateNoNegatives(values: number[]): void {
  const negatives = values.filter((value) => value < 0);
  if (negatives.length === 0) return;
  throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
}

/** Adds all numbers together. */
function sum(values: number[]): number {
  return values.reduce((accumulator, value) => accumulator + value, 0);
}

function escapeRegExp(text: string): string {
  // Escape characters that have special meaning in regex
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
