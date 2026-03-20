'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Play,
  RotateCcw,
  Lightbulb,
  CheckCircle,
  Loader2,
  AlertCircle,
  Terminal,
  Code2,
  Zap
} from 'lucide-react';
import { usePyodide } from '@/hooks/use-pyodide';
import type { CodeExercise } from '@/data/lessons';

interface CodeRunnerProps {
  exercise: CodeExercise;
  onComplete?: () => void;
}

export function CodeRunner({ exercise, onComplete }: CodeRunnerProps) {
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { isLoading, isReady, runPython } = usePyodide();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset ALL state when exercise changes (moving to next/previous step)
  useEffect(() => {
    setCode(exercise.starterCode);
    setOutput('');
    setError(null);
    setExecutionTime(0);
    setShowSolution(false);
    setIsComplete(false);
    setIsRunning(false);
  }, [exercise.starterCode, exercise.title]); // Added exercise.title for extra safety

  const handleRun = useCallback(async () => {
    if (!isReady || isRunning) return;

    setIsRunning(true);
    setOutput('');
    setError(null);

    try {
      // Handle input() simulation
      const inputMatches = code.match(/input\s*\([^)]*\)/g) || [];
      let modifiedCode = code;
      
      if (inputMatches.length > 0 && exercise.prePopulatedInputs && exercise.prePopulatedInputs.length > 0) {
        const inputSetup = `
_input_queue = ${JSON.stringify(exercise.prePopulatedInputs)}
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

      if (!result.error && result.output) {
        setIsComplete(true);
        onComplete?.();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsRunning(false);
    }
  }, [code, isReady, isRunning, runPython, exercise.prePopulatedInputs, onComplete]);

  const handleReset = useCallback(() => {
    setCode(exercise.starterCode);
    setOutput('');
    setError(null);
    setExecutionTime(0);
    setShowSolution(false);
    setIsComplete(false);
    setIsRunning(false);
  }, [exercise.starterCode]);

  const handleShowSolution = useCallback(() => {
    setCode(exercise.solution);
    setShowSolution(true);
  }, [exercise.solution]);

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setShowSolution(false);
  }, []);

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

  return (
    <div className="space-y-3">
      {/* Instruction */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">{exercise.instruction}</p>
      </div>

      {/* Pre-populated inputs */}
      {exercise.prePopulatedInputs && exercise.prePopulatedInputs.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-500 dark:text-slate-400">Test inputs:</span>
          {exercise.prePopulatedInputs.map((input, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {input}
            </Badge>
          ))}
        </div>
      )}

      {/* Code Editor Card */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader className="bg-slate-50 dark:bg-slate-900 py-2 px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Code Editor</span>
              {isReady && (
                <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                  <Zap className="w-3 h-3 mr-1" />
                  Ready
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRun}
                disabled={!isReady || isRunning || isLoading}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Run
              </Button>
              <Button onClick={handleReset} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-700">
            {/* Editor */}
            <div className="min-h-[200px] flex">
              <div className="w-8 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex-shrink-0 select-none overflow-hidden">
                <div className="py-2 px-1 font-mono text-xs text-slate-400 dark:text-slate-500 text-right leading-6">
                  {lines.map((_, i) => (
                    <div key={i} className="h-6">{i + 1}</div>
                  ))}
                </div>
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={handleCodeChange}
                onKeyDown={handleKeyDown}
                className="flex-1 p-2 font-mono text-sm leading-6 bg-transparent text-slate-800 dark:text-slate-200 resize-none focus:outline-none min-h-[200px]"
                spellCheck={false}
              />
            </div>
            
            {/* Output */}
            <div className="min-h-[200px] bg-slate-50 dark:bg-slate-900">
              <div className="p-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Output</span>
                {executionTime > 0 && (
                  <span className="text-xs text-slate-400 ml-auto">{executionTime.toFixed(0)}ms</span>
                )}
              </div>
              <ScrollArea className="h-[160px]">
                <div className="p-2 font-mono text-sm">
                  {isLoading && !isReady && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-xs">Loading Python...</span>
                    </div>
                  )}
                  {!isLoading && !isReady && (
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs">Python failed to load</span>
                    </div>
                  )}
                  {output && (
                    <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-xs">
                      {output}
                    </div>
                  )}
                  {error && (
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs text-red-600 dark:text-red-400">
                      {error}
                    </div>
                  )}
                  {!output && !error && isReady && (
                    <span className="text-xs text-slate-400 italic">Click Run to execute</span>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hints & Solution */}
      <div className="flex flex-wrap gap-2 items-center">
        {exercise.hints.map((hint, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="text-xs text-amber-600 dark:text-amber-400"
            onClick={() => alert(`Hint ${index + 1}: ${hint}`)}
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            Hint {index + 1}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-green-600 dark:text-green-400"
          onClick={handleShowSolution}
          disabled={showSolution}
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          {showSolution ? 'Solution Shown' : 'Show Solution'}
        </Button>
        {isComplete && (
          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Complete!
          </Badge>
        )}
      </div>
    </div>
  );
}

export default CodeRunner;
