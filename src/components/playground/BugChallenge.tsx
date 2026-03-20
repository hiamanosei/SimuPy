'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bug,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Play,
  RotateCcw,
  Loader2,
  Terminal,
  Code2
} from 'lucide-react';
import { usePyodide } from '@/hooks/use-pyodide';
import { cn } from '@/lib/utils';

interface BugChallengeProps {
  title: string;
  description: string;
  buggyCode: string;
  bugLine: number;
  bugDescription: string;
  hint: string;
  fixedCode: string;
  errorType: string;
  errorExplanation: string;
  onComplete?: () => void;
}

export function BugChallenge({
  title,
  description,
  buggyCode,
  bugLine,
  bugDescription,
  hint,
  fixedCode,
  errorType,
  errorExplanation,
  onComplete
}: BugChallengeProps) {
  const [code, setCode] = useState(buggyCode);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>(0);

  const { isLoading, isReady, runPython } = usePyodide();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset ALL state when challenge changes (switching to a different bug)
  useEffect(() => {
    setCode(buggyCode);
    setOutput('');
    setError(null);
    setExecutionTime(0);
    setShowHint(false);
    setShowAnswer(false);
    setIsComplete(false);
    setIsRunning(false);
  }, [buggyCode, title, bugLine, bugDescription, hint, fixedCode, errorType, errorExplanation]);

  const handleRun = useCallback(async () => {
    if (!isReady || isRunning) return;

    setIsRunning(true);
    setOutput('');
    setError(null);

    try {
      const result = await runPython(code);
      setOutput(result.output);
      setError(result.error);
      setExecutionTime(result.executionTime);

      // Check if the code runs without errors
      if (!result.error) {
        setIsComplete(true);
        onComplete?.();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsRunning(false);
    }
  }, [code, isReady, isRunning, runPython, onComplete]);

  const handleReset = useCallback(() => {
    setCode(buggyCode);
    setOutput('');
    setError(null);
    setIsComplete(false);
    setExecutionTime(0);
    setShowAnswer(false);
  }, [buggyCode]);

  const handleShowAnswer = useCallback(() => {
    setCode(fixedCode);
    setShowAnswer(true);
  }, [fixedCode]);

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setIsComplete(false);
    setShowAnswer(false);
  }, []);

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
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  }, [code]);

  const lines = code.split('\n');

  const getErrorTypeColor = (type: string) => {
    switch (type) {
      case 'SyntaxError':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'TypeError':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'LogicError':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'IndentationError':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'IndexError':
        return 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800';
      default:
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800';
    }
  };

  return (
    <Card className="w-full shadow-lg border-slate-200 dark:border-slate-700 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 pb-3">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
              <Bug className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
                {title}
              </CardTitle>
              <Badge variant="outline" className={cn("mt-1 text-xs", getErrorTypeColor(errorType))}>
                {errorType}
              </Badge>
            </div>
          </div>
          {isComplete && (
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Fixed!
            </Badge>
          )}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-700">
          {/* Code Editor */}
          <div className="relative min-h-[220px] flex flex-col">
            <div className="bg-slate-50 dark:bg-slate-900 px-3 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Fix the Bug
              </span>
              <div className="flex items-center gap-2">
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
                  Run
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
            <div className="flex-1 flex overflow-hidden">
              {/* Line numbers */}
              <div className="w-10 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex-shrink-0 select-none overflow-hidden">
                <div className="py-2 px-2 font-mono text-xs text-slate-400 dark:text-slate-500 text-right leading-6">
                  {lines.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-6",
                        bugLine === i + 1 && !showAnswer && "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold"
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
                  style={{ minHeight: '180px' }}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                />
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col min-h-[220px]">
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
              <div className="p-3 font-mono text-sm">
                {isLoading && !isReady && (
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading Python...
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
                      <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="text-red-700 dark:text-red-300 text-sm whitespace-pre-wrap break-words">
                        {error}
                      </div>
                    </div>
                  </div>
                )}

                {!output && !error && isReady && (
                  <div className="text-slate-400 dark:text-slate-500 italic text-sm">
                    Click &quot;Run&quot; to test your fix
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Hint and Solution section */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              size="sm"
              className="gap-1 text-xs"
            >
              {showHint ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              <Lightbulb className="w-3 h-3" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
            <Button
              onClick={handleShowAnswer}
              variant="outline"
              size="sm"
              className="gap-1 text-xs"
              disabled={showAnswer}
            >
              <CheckCircle className="w-3 h-3" />
              {showAnswer ? 'Answer Shown' : 'Show Answer'}
            </Button>
          </div>

          {showHint && (
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700 dark:text-slate-300">{hint}</p>
              </div>
            </div>
          )}

          {showAnswer && (
            <div className="mt-3 space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">
                  What was wrong:
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">{bugDescription}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
                  Understanding the error:
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">{errorExplanation}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-3 overflow-x-auto">
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Correct Code:
                </h4>
                <pre className="font-mono text-sm text-slate-700 dark:text-slate-300 whitespace-pre">
                  {fixedCode}
                </pre>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default BugChallenge;
