'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Play,
  RotateCcw,
  Lightbulb,
  CheckCircle,
  Target,
  Loader2,
  AlertCircle,
  Terminal,
  Code2,
  Zap
} from 'lucide-react';
import { usePyodide } from '@/hooks/use-pyodide';
import { cn } from '@/lib/utils';

interface PythonPlaygroundProps {
  starterCode: string;
  hints: string[];
  solution: string;
  explanation: string;
  prePopulatedInputs?: string[];
  onCodeChange?: (code: string) => void;
}

export function PythonPlayground({
  starterCode,
  hints,
  solution,
  explanation,
  prePopulatedInputs = [],
  onCodeChange
}: PythonPlaygroundProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [currentLine, setCurrentLine] = useState<number | null>(null);
  const [inputValues, setInputValues] = useState<string[]>(prePopulatedInputs);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [pendingInputs, setPendingInputs] = useState<string[]>([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [currentInputPrompt, setCurrentInputPrompt] = useState('');

  const { isLoading, isReady, runPython } = usePyodide();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCode(starterCode);
    setOutput('');
    setError(null);
    setShowSolution(false);
    setInputValues(prePopulatedInputs);
  }, [starterCode, prePopulatedInputs]);

  const handleRun = useCallback(async () => {
    if (!isReady || isRunning) return;

    setIsRunning(true);
    setOutput('');
    setError(null);
    setCurrentLine(null);

    try {
      // Parse input() calls in the code
      const inputMatches = code.match(/input\s*\([^)]*\)/g) || [];
      const inputPrompts: string[] = [];
      
      inputMatches.forEach(match => {
        const promptMatch = match.match(/input\s*\(\s*["']([^"']*)["']\s*\)/);
        inputPrompts.push(promptMatch ? promptMatch[1] : '');
      });

      // Prepare code with pre-populated inputs
      let modifiedCode = code;
      
      if (inputPrompts.length > 0) {
        // Use pre-populated inputs or default values
        const inputsToUse = inputValues.length > 0 ? inputValues : inputPrompts.map(() => '');
        
        // Create input simulation code
        const inputSetup = `
_input_queue = ${JSON.stringify(inputsToUse)}
_input_index = 0

def _custom_input(prompt=""):
    global _input_index
    print(prompt, end="")
    if _input_index < len(_input_queue):
        result = _input_queue[_input_index]
        _input_index += 1
        print(result)
        return result
    return ""

import builtins
builtins.input = _custom_input
`;
        modifiedCode = inputSetup + '\n' + code;
      }

      const result = await runPython(modifiedCode);
      setOutput(result.output);
      setError(result.error);
      setExecutionTime(result.executionTime);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsRunning(false);
    }
  }, [code, isReady, isRunning, runPython, inputValues]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    setOutput('');
    setError(null);
    setCurrentLine(null);
    setExecutionTime(0);
    setShowSolution(false);
    setInputValues(prePopulatedInputs);
    onCodeChange?.(starterCode);
  }, [starterCode, onCodeChange, prePopulatedInputs]);

  const handleShowSolution = useCallback(() => {
    setCode(solution);
    setShowSolution(true);
    onCodeChange?.(solution);
  }, [solution, onCodeChange]);

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setShowSolution(false);
    onCodeChange?.(e.target.value);
  }, [onCodeChange]);

  // Handle tab key for proper indentation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      
      // Set cursor position after the tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  }, [code]);

  // Get line count for consistent rendering
  const lines = code.split('\n');

  return (
    <Card className="w-full shadow-lg border-slate-200 dark:border-slate-700">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Code2 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Python Playground
            </CardTitle>
            {isReady && (
              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Ready
              </Badge>
            )}
            {!isReady && !isLoading && (
              <Badge variant="outline" className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                Error
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isLoading && (
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Loading Python...
              </span>
            )}
            <Button
              onClick={handleRun}
              disabled={!isReady || isRunning || isLoading}
              className="bg-green-600 hover:bg-green-700 text-white gap-1"
              size="sm"
            >
              {isRunning ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isRunning ? 'Running...' : 'Run'}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-700">
          {/* Code Editor */}
          <div className="relative min-h-[280px] flex flex-col">
            <div className="bg-slate-50 dark:bg-slate-900 px-3 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Code Editor
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-500">
                {lines.length} lines
              </span>
            </div>
            <div className="flex-1 flex overflow-hidden">
              {/* Line numbers */}
              <div className="w-10 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex-shrink-0 select-none overflow-hidden">
                <div className="py-2 px-2 font-mono text-xs text-slate-400 dark:text-slate-500 text-right leading-6">
                  {lines.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-6",
                        currentLine === i + 1 && "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                      )}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Code textarea */}
              <div className="flex-1 overflow-auto">
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={handleCodeChange}
                  onKeyDown={handleKeyDown}
                  className="w-full h-full p-2 font-mono text-sm leading-6 bg-transparent text-slate-800 dark:text-slate-200 resize-none focus:outline-none"
                  style={{ minHeight: '240px' }}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                />
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col min-h-[280px]">
            <div className="bg-slate-50 dark:bg-slate-900 px-3 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Output
              </span>
              {executionTime > 0 && (
                <span className="text-xs text-slate-500 dark:text-slate-500">
                  {executionTime.toFixed(2)}ms
                </span>
              )}
            </div>
            <ScrollArea className="flex-1">
              <div ref={outputRef} className="p-3 font-mono text-sm">
                {isLoading && !isReady && (
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading Python environment...
                  </div>
                )}

                {!isLoading && !isReady && (
                  <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    Python environment failed to load. Please refresh the page.
                  </div>
                )}

                {output && (
                  <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {output.split('\n').map((line, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-slate-400 dark:text-slate-500 select-none flex-shrink-0">&gt;</span>
                        <span className="break-all">{line}</span>
                      </div>
                    ))}
                  </div>
                )}

                {error && (
                  <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="text-red-700 dark:text-red-300 text-sm whitespace-pre-wrap break-words">
                        {error}
                      </div>
                    </div>
                  </div>
                )}

                {!output && !error && isReady && (
                  <div className="text-slate-400 dark:text-slate-500 italic text-sm">
                    Click &quot;Run&quot; to execute your code
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Input Values Section */}
        {prePopulatedInputs && prePopulatedInputs.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-700 p-3 bg-blue-50 dark:bg-blue-900/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">Pre-filled Input Values:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {prePopulatedInputs.map((input, index) => (
                <div key={index} className="flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400">#{index + 1}:</span>
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{input}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              These values will be used when input() is called. You can edit them in the code or run as-is.
            </p>
          </div>
        )}

        <Separator />

        {/* Bottom tabs for hints, solution */}
        <Tabs defaultValue="explanation" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-slate-50 dark:bg-slate-900 p-0 h-auto">
            <TabsTrigger
              value="explanation"
              className="data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 rounded-none px-4 py-2 text-sm"
            >
              <Lightbulb className="w-4 h-4 mr-1" />
              Explanation
            </TabsTrigger>
            <TabsTrigger
              value="hints"
              className="data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 rounded-none px-4 py-2 text-sm"
            >
              <Target className="w-4 h-4 mr-1" />
              Hints ({hints.length})
            </TabsTrigger>
            <TabsTrigger
              value="solution"
              className="data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 rounded-none px-4 py-2 text-sm"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Solution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explanation" className="p-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                {explanation}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="hints" className="p-4">
            <div className="space-y-2">
              {hints.map((hint, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                >
                  <div className="w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">{index + 1}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{hint}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="solution" className="p-4">
            <div className="space-y-3">
              <Button
                onClick={handleShowSolution}
                variant="outline"
                size="sm"
                disabled={showSolution}
              >
                {showSolution ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Solution Applied
                  </>
                ) : (
                  <>
                    <Code2 className="w-4 h-4 mr-2" />
                    Show Solution
                  </>
                )}
              </Button>

              {showSolution && (
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-3 overflow-x-auto">
                  <pre className="font-mono text-sm text-slate-700 dark:text-slate-300 whitespace-pre">
                    {solution}
                  </pre>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default PythonPlayground;
