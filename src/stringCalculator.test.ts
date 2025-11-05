import { describe, it, expect } from "vitest";
// NOTE: Implementation intentionally not written yet (TDD). These tests should fail initially.
// The implementation is expected to export an `add` function from `stringCalculator.ts`.
// import { add } from "./stringCalculator";

/**
 * String Calculator - TDD Test Suite
 *
 * Requirements covered by these tests:
 * - Adding numbers from a comma-separated string (e.g., "1,2,3" → 6)
 * - Handling an empty string ("" → 0)
 * - Supporting newline delimiters mixed with commas ("1\n2,3" → 6)
 * - Allowing custom delimiters in header form ("//;\n1;2" → 3)
 * - Throwing an error for negative numbers with a clear message listing all negatives
 *   (e.g., "Negatives not allowed: -2, -5")
 *
 * Edge-case notes:
 * - Whitespace is not explicitly specified as allowed, so inputs are assumed to be clean.
 * - Inputs are assumed to be valid numbers where present (aside from negativity), per classic kata scope.
 */

describe("String Calculator", () => {
  it("returns 0 for an empty string", () => {
    // Edge case: explicit empty input should yield 0.
    expect(add("")).toBe(0);
  });

  it("sums comma-separated numbers", () => {
    // Basic addition using default comma delimiter.
    expect(add("1")).toBe(1);
    expect(add("1,2")).toBe(3);
    expect(add("1,2,3")).toBe(6);
    expect(add("10,20,30,40")).toBe(100);
  });

  it("supports newlines as delimiters along with commas", () => {
    // Mixed delimiters: both comma and newline should be treated as separators.
    expect(add("1\n2,3")).toBe(6);
    expect(add("4\n5\n6")).toBe(15);
    expect(add("7,8\n9")).toBe(24);
  });

  it("allows a custom single-character delimiter specified in the header", () => {
    // Custom delimiter format: //<delimiter>\n<numbers>
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//#\n2#3#4")).toBe(9);
    expect(add("///\n5/10/15")).toBe(30);
  });

  it("throws an error for any negative numbers and lists all of them", () => {
    // Error message must include all negatives encountered, comma-separated.
    // Exact expected message format: "Negatives not allowed: <negatives>"
    expect(() => add("-1")).toThrowError("Negatives not allowed: -1");
    expect(() => add("1,-2,3,-5")).toThrowError(
      "Negatives not allowed: -2, -5"
    );
    expect(() => add("//;\n1;-4;2;-9")).toThrowError(
      "Negatives not allowed: -4, -9"
    );
  });
});
