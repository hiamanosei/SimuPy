'use client';

import { useCallback, useRef, useState, useEffect } from 'react';

interface PyodideResult {
  output: string;
  error: string | null;
  executionTime: number;
}

interface UsePyodideReturn {
  isLoading: boolean;
  isReady: boolean;
  runPython: (code: string) => Promise<PyodideResult>;
  error: string | null;
}

declare global {
  interface Window {
    loadPyodide: (config?: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  runPython: (code: string) => unknown;
  setStdout: (options: { batched: (text: string) => void }) => void;
  setStderr: (options: { batched: (text: string) => void }) => void;
  globals: {
    set: (name: string, value: unknown) => void;
    get: (name: string) => unknown;
  };
}

export function usePyodide(): UsePyodideReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pyodideRef = useRef<PyodideInterface | null>(null);

  useEffect(() => {
    const loadPyodideScript = async () => {
      try {
        // Check if Pyodide script is already loaded
        if (typeof window.loadPyodide === 'undefined') {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          script.async = true;

          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Pyodide script'));
            document.head.appendChild(script);
          });
        }

        // Initialize Pyodide with proper index URL
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });
        
        pyodideRef.current = pyodide;
        setIsReady(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load Pyodide:', err);
        setError('Failed to load Python environment. Please refresh the page.');
        setIsLoading(false);
      }
    };

    loadPyodideScript();
  }, []);

  const runPython = useCallback(async (code: string): Promise<PyodideResult> => {
    if (!pyodideRef.current) {
      return {
        output: '',
        error: 'Python environment is not ready yet. Please wait...',
        executionTime: 0
      };
    }

    const startTime = performance.now();
    let output = '';
    let errorOutput = '';

    try {
      const pyodide = pyodideRef.current;

      // Set up stdout and stderr handlers
      pyodide.setStdout({
        batched: (text: string) => {
          output += text;
        }
      });

      pyodide.setStderr({
        batched: (text: string) => {
          errorOutput += text;
        }
      });

      // Run the user's code directly
      await pyodide.runPythonAsync(code);

      const executionTime = performance.now() - startTime;

      return {
        output: output.trim(),
        error: errorOutput.trim() || null,
        executionTime
      };
    } catch (err) {
      const executionTime = performance.now() - startTime;
      const errorMessage = err instanceof Error ? err.message : String(err);

      // Simplify error messages for students
      const simplifiedError = simplifyError(errorMessage);

      return {
        output: output.trim(),
        error: simplifiedError,
        executionTime
      };
    }
  }, []);

  return { isLoading, isReady, runPython, error };
}

function simplifyError(error: string): string {
  // Common error simplifications for students
  const simplifications: { pattern: RegExp; replacement: string }[] = [
    {
      pattern: /SyntaxError:\s*(.+)/,
      replacement: 'Syntax Error: $1\n💡 Tip: Check your spelling and punctuation!'
    },
    {
      pattern: /NameError:\s*name '(.+)' is not defined/,
      replacement: 'Name Error: The variable \'$1\' doesn\'t exist.\n💡 Tip: Make sure you created the variable before using it!'
    },
    {
      pattern: /TypeError:\s*(.+)/,
      replacement: 'Type Error: $1\n💡 Tip: Check if you\'re using the right data type!'
    },
    {
      pattern: /IndexError:\s*(.+)/,
      replacement: 'Index Error: $1\n💡 Tip: Remember, list positions start at 0!'
    },
    {
      pattern: /IndentationError:\s*(.+)/,
      replacement: 'Indentation Error: $1\n💡 Tip: Make sure your code is properly aligned!'
    },
    {
      pattern: /ZeroDivisionError/,
      replacement: 'Division Error: You can\'t divide by zero!\n💡 Tip: Check your divisor value.'
    },
    {
      pattern: /ValueError:\s*(.+)/,
      replacement: 'Value Error: $1\n💡 Tip: Check that your input is in the correct format!'
    }
  ];

  for (const { pattern, replacement } of simplifications) {
    if (pattern.test(error)) {
      return error.replace(pattern, replacement);
    }
  }

  return error;
}

export default usePyodide;
