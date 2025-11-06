import { useState, useRef } from "react";

import { add } from "./stringCalculator";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resultRef = useRef<HTMLParagraphElement>(null);

  // Change: Use a button instead of div for semantics and keyboard accessibility
  const handleCalculate = () => {
    try {
      setError(null);
      const calculated = add(input);
      setResult(calculated);
      // Focus the result content for screen readers (announce)
      setTimeout(() => {
        resultRef.current?.focus();
      }, 0);
    } catch (e: any) {
      setResult(null);
      setError(e.message);
      setTimeout(() => {
        resultRef.current?.focus();
      }, 0);
    }
  };

  return (
    // Use <main> for page main content landmark
    <main
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        color: "#111", // Improved contrast from #aaa to #111 for better readability
        minHeight: "100vh",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={600}
        height={400}
        alt="Calculator - pastel image with numbers" // Add meaningful alt text
        style={{ display: "block", maxWidth: "100%" }}
      />

      {/* Use a single <h1> for the application title, then <h2> for sub-headings */}
      <h1>String Calculator</h1>

      {/* Use <form> for proper semantics, improved accessibility and native enter/submit support */}
      <form
        // Prevent default page submit for SPA
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
        aria-labelledby="calculator-title"
        style={{ maxWidth: 600 }}
      >
        <h2 id="calculator-title" style={{ fontSize: "20px" }}>
          Enter numbers
        </h2>

        {/* 
          Use <label> tied to textarea with htmlFor/id for screen reader and focus support.
          Mark required fields as such.
        */}
        <label
          htmlFor="numbersInput"
          style={{
            display: "block",
            marginTop: 16,
            color: "#555",
            fontWeight: 600,
          }}
        >
          Numbers (comma, newline, or custom delimiter):
        </label>
        <textarea
          id="numbersInput"
          style={{
            margin: "10px 0",
            color: "#222", // Improved contrast for entered text
            width: "100%",
            minHeight: 60,
            fontSize: "16px",
          }}
          placeholder="Enter numbers"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-required="true"
          aria-describedby="input-desc"
        />

        {/* Use actual <button> for semantic, accessible action control */}
        <button
          type="submit"
          style={{
            padding: "10px 24px",
            backgroundColor: "#006994", // Darker blue for better contrast
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: "16px",
            cursor: "pointer",
            marginTop: 8,
          }}
          // Add :focus style via inline for demo, but use CSS in production
          onFocus={(e) => (e.currentTarget.style.outline = "2px solid #222")}
          onBlur={(e) => (e.currentTarget.style.outline = "none")}
          aria-label="Calculate total from numbers input"
        >
          Calculate
        </button>
      </form>

      {/* 
        aria-live="assertive" to announce result changes to screen readers.
        Use tabIndex to allow focus on result for screen readers after calculation/error.
      */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        style={{ margin: "16px 0 0 0", minHeight: 24 }}
      >
        {(result !== null || error) && (
          <p
            ref={resultRef}
            tabIndex={-1}
            style={{
              color: error ? "#c00" : "green",
              outline: "none",
              fontWeight: 500,
            }}
          >
            {error ? `Error: ${error}` : `Result: ${result}`}
          </p>
        )}
      </div>

      {/* 
        Alert for info/tips — use role="status" for non-error messages.
        Use more readable color contrast for message.
      */}
      <div role="status" aria-live="polite" style={{ marginTop: 20 }}>
        <p style={{ color: "#222", fontSize: 15 }}>
          Make sure you enter numbers correctly!
        </p>
      </div>
    </main>
  );
};

export default App;
