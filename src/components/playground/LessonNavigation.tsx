'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Code2,
  Bug,
  Target,
  Trophy,
  Menu,
  X,
  Home,
  CheckCircle2,
  Lightbulb,
  Play,
  Flame
} from 'lucide-react';
import { lessons, bugChallenges, topics } from '@/data/lessons';
import { CodeRunner } from './CodeRunner';
import { BugChallenge } from './BugChallenge';
import { cn } from '@/lib/utils';
import type { Lesson as LessonType } from '@/data/lessons';

type ViewMode = 'home' | 'lesson' | 'challenge';

interface LessonProgress {
  [key: string]: number; // step index completed
}

export function LessonNavigation() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress>({});
  const [challengeProgress, setChallengeProgress] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'lessons' | 'challenges'>('lessons');

  const handleSelectLesson = useCallback((lessonId: string) => {
    setCurrentLesson(lessonId);
    setCurrentChallenge(null);
    setCurrentStep(0);
    setViewMode('lesson');
  }, []);

  const handleSelectChallenge = useCallback((challengeId: string) => {
    setCurrentChallenge(challengeId);
    setCurrentLesson(null);
    setViewMode('challenge');
  }, []);

  const handleGoHome = useCallback(() => {
    setViewMode('home');
    setCurrentLesson(null);
    setCurrentChallenge(null);
    setCurrentStep(0);
  }, []);

  const handleNextStep = useCallback(() => {
    const lesson = lessons.find(l => l.id === currentLesson);
    if (lesson && currentStep < lesson.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentLesson, currentStep]);

  const handlePrevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleStepComplete = useCallback(() => {
    if (currentLesson) {
      setLessonProgress(prev => ({
        ...prev,
        [currentLesson]: Math.max(prev[currentLesson] || 0, currentStep + 1)
      }));
    }
  }, [currentLesson, currentStep]);

  const handleChallengeComplete = useCallback(() => {
    if (currentChallenge) {
      setChallengeProgress(prev => ({ ...prev, [currentChallenge]: true }));
    }
  }, [currentChallenge]);

  const selectedLesson = lessons.find(l => l.id === currentLesson);
  const selectedChallenge = bugChallenges.find(c => c.id === currentChallenge);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'guided':
        return <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 text-xs">Guided</Badge>;
      case 'practice':
        return <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 text-xs">Practice</Badge>;
      case 'independent':
        return <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 text-xs">Independent</Badge>;
      default:
        return null;
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'explain':
        return <BookOpen className="w-4 h-4" />;
      case 'guided':
        return <Lightbulb className="w-4 h-4" />;
      case 'practice':
        return <Play className="w-4 h-4" />;
      case 'challenge':
        return <Flame className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'explain':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'guided':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'practice':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'challenge':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      default:
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400';
    }
  };

  const completedLessons = Object.values(lessonProgress).filter(v => v > 0).length;
  const completedChallenges = Object.values(challengeProgress).filter(Boolean).length;
  const totalProgress = Math.round(((completedLessons + completedChallenges) / (lessons.length + bugChallenges.length)) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Top Header - Always visible with Home button */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex-shrink-0 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Home Button - Always visible */}
            <Button
              onClick={handleGoHome}
              variant={viewMode === 'home' ? 'default' : 'ghost'}
              size="sm"
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                iLower Secondary Computing
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive Python Learning
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full">
              <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="font-semibold text-sm text-yellow-700 dark:text-yellow-400">{totalProgress}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Collapsible */}
        <aside
          className={cn(
            "bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 flex-shrink-0",
            sidebarOpen ? "w-64 lg:w-72" : "w-0 lg:w-16 overflow-hidden"
          )}
        >
          {/* Sidebar Header */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                  Lessons
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hidden lg:flex"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>

          {sidebarOpen && (
            <>
              {/* Progress */}
              <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Progress</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{totalProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${totalProgress}%` }}
                  />
                </div>
              </div>

              {/* Navigation Tabs */}
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'lessons' | 'challenges')} className="flex-1 flex flex-col min-h-0">
                <TabsList className="w-full rounded-none border-b border-slate-200 dark:border-slate-700 bg-transparent p-0 h-auto flex-shrink-0">
                  <TabsTrigger
                    value="lessons"
                    className="flex-1 rounded-none py-2.5 data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 data-[state=active]:bg-transparent text-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-1" />
                    Lessons
                  </TabsTrigger>
                  <TabsTrigger
                    value="challenges"
                    className="flex-1 rounded-none py-2.5 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:bg-transparent text-xs"
                  >
                    <Bug className="w-3.5 h-3.5 mr-1" />
                    Bugs
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="lessons" className="flex-1 m-0 overflow-hidden min-h-0">
                  <ScrollArea className="h-full">
                    <div className="p-2 space-y-1">
                      {lessons.map((lesson) => {
                        const isActive = currentLesson === lesson.id;
                        const stepProgress = lessonProgress[lesson.id] || 0;
                        const totalSteps = lesson.steps.length;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleSelectLesson(lesson.id)}
                            className={cn(
                              "w-full text-left p-2.5 rounded-lg transition-colors",
                              isActive
                                ? "bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800"
                                : "hover:bg-slate-100 dark:hover:bg-slate-700"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-xs text-slate-800 dark:text-slate-200 truncate">
                                {lesson.title}
                              </span>
                              {stepProgress >= totalSteps && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {getDifficultyBadge(lesson.difficulty)}
                              {stepProgress > 0 && stepProgress < totalSteps && (
                                <div className="flex items-center gap-0.5">
                                  {Array.from({ length: Math.min(totalSteps, 6) }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={cn(
                                        "w-1.5 h-1.5 rounded-full",
                                        i < stepProgress
                                          ? "bg-green-500"
                                          : "bg-slate-200 dark:bg-slate-700"
                                      )}
                                    />
                                  ))}
                                  {totalSteps > 6 && (
                                    <span className="text-xs text-slate-400 ml-0.5">+{totalSteps - 6}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="challenges" className="flex-1 m-0 overflow-hidden min-h-0">
                  <ScrollArea className="h-full">
                    <div className="p-2 space-y-1">
                      {bugChallenges.map((challenge) => {
                        const isCompleted = challengeProgress[challenge.id];
                        const isActive = currentChallenge === challenge.id;

                        return (
                          <button
                            key={challenge.id}
                            onClick={() => handleSelectChallenge(challenge.id)}
                            className={cn(
                              "w-full text-left p-2.5 rounded-lg transition-colors",
                              isActive
                                ? "bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
                                : "hover:bg-slate-100 dark:hover:bg-slate-700"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-xs text-slate-800 dark:text-slate-200 truncate">
                                {challenge.title}
                              </span>
                              {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {challenge.errorType}
                            </Badge>
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            {viewMode === 'home' && (
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Welcome Section */}
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex-shrink-0">
                        <GraduationCap className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                          Welcome to Python Programming!
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm md:text-base">
                          Learn Python step-by-step with interactive lessons. Each lesson has explanations, guided examples, and practice exercises!
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Button onClick={() => handleSelectLesson(lessons[0].id)} className="bg-yellow-500 hover:bg-yellow-600 text-white gap-2 text-sm">
                            <BookOpen className="w-4 h-4" />
                            Start Learning
                          </Button>
                          <Button onClick={() => handleSelectChallenge(bugChallenges[0].id)} variant="outline" className="gap-2 text-sm">
                            <Bug className="w-4 h-4" />
                            Try Bug Challenge
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Topics Overview */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    Topics Covered
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {topics.map((topic) => (
                      <Card key={topic.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{topic.icon}</span>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">{topic.name}</h4>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Lessons Grid */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    Available Lessons
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {lessons.map((lesson) => {
                      const stepProgress = lessonProgress[lesson.id] || 0;
                      const totalSteps = lesson.steps.length;

                      return (
                        <Card
                          key={lesson.id}
                          className="hover:shadow-md transition-shadow cursor-pointer group"
                          onClick={() => handleSelectLesson(lesson.id)}
                        >
                          <CardHeader className="pb-2 pt-3 px-3">
                            <div className="flex items-center justify-between">
                              {getDifficultyBadge(lesson.difficulty)}
                              {stepProgress >= totalSteps && (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0 px-3 pb-3">
                            <CardTitle className="text-sm group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                              {lesson.title}
                            </CardTitle>
                            <CardDescription className="mt-1 text-xs line-clamp-2">
                              {lesson.description}
                            </CardDescription>
                            <div className="mt-2 flex items-center text-xs text-slate-500 dark:text-slate-400">
                              <span className="truncate">{lesson.topic}</span>
                              {stepProgress > 0 && stepProgress < totalSteps && (
                                <div className="ml-auto flex items-center gap-0.5">
                                  {Array.from({ length: totalSteps }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={cn(
                                        "w-2 h-2 rounded-full",
                                        i < stepProgress
                                          ? "bg-green-500"
                                          : "bg-slate-200 dark:bg-slate-700"
                                      )}
                                    />
                                  ))}
                                </div>
                              )}
                              <ChevronRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform flex-shrink-0" />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Bug Challenges Grid */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
                    <Bug className="w-5 h-5 text-red-600 dark:text-red-400" />
                    Bug Fixing Challenges
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {bugChallenges.map((challenge) => {
                      const isCompleted = challengeProgress[challenge.id];

                      return (
                        <Card
                          key={challenge.id}
                          className="hover:shadow-md transition-shadow cursor-pointer group border-red-100 dark:border-red-900/30"
                          onClick={() => handleSelectChallenge(challenge.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 text-xs">
                                {challenge.errorType}
                              </Badge>
                              {isCompleted && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                            </div>
                            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                              {challenge.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {challenge.description}
                            </p>
                            <ChevronRight className="w-3 h-3 mt-2 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'lesson' && selectedLesson && (
              <div className="max-w-4xl mx-auto space-y-4">
                {/* Lesson Header */}
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {getDifficultyBadge(selectedLesson.difficulty)}
                      <Badge variant="outline" className="text-xs">{selectedLesson.topic}</Badge>
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                      {selectedLesson.title}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {selectedLesson.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Step Progress */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {selectedLesson.steps.map((step, index) => {
                    const isCompleted = index < (lessonProgress[selectedLesson.id] || 0);
                    const isCurrent = index === currentStep;

                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap",
                          isCurrent
                            ? "bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700"
                            : isCompleted
                            ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                            : "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                          isCurrent
                            ? "bg-yellow-500 text-white"
                            : isCompleted
                            ? "bg-green-500 text-white"
                            : getStepColor(step.type)
                        )}>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                        </div>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Current Step Content */}
                {selectedLesson.steps[currentStep] && (
                  <Card className="border-slate-200 dark:border-slate-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "p-2 rounded-lg",
                          getStepColor(selectedLesson.steps[currentStep].type)
                        )}>
                          {getStepIcon(selectedLesson.steps[currentStep].type)}
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {selectedLesson.steps[currentStep].title}
                          </CardTitle>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs mt-1",
                              currentStep < (lessonProgress[selectedLesson.id] || 0) && "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                            )}
                          >
                            {currentStep < (lessonProgress[selectedLesson.id] || 0) ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Step {currentStep + 1} of {selectedLesson.steps.length} - Completed
                              </>
                            ) : (
                              <>Step {currentStep + 1} of {selectedLesson.steps.length}</>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {selectedLesson.steps[currentStep].type === 'explain' && selectedLesson.steps[currentStep].content && (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <div 
                            className="text-slate-700 dark:text-slate-300 leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: selectedLesson.steps[currentStep].content!
                                .replace(/```python\n([\s\S]*?)```/g, '<pre class="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-sm overflow-x-auto"><code>$1</code></pre>')
                                .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-sm overflow-x-auto"><code>$1</code></pre>')
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\n/g, '<br/>')
                            }}
                          />
                        </div>
                      )}

                      {selectedLesson.steps[currentStep].exercise && (
                        <CodeRunner
                          key={`${selectedLesson.id}-${currentStep}`}
                          exercise={selectedLesson.steps[currentStep].exercise!}
                          onComplete={handleStepComplete}
                        />
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Step {currentStep + 1} / {selectedLesson.steps.length}
                  </div>

                  {currentStep < selectedLesson.steps.length - 1 ? (
                    <Button
                      onClick={handleNextStep}
                      className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleGoHome}
                      className="gap-2 bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            )}

            {viewMode === 'challenge' && selectedChallenge && (
              <div className="max-w-4xl mx-auto space-y-4">
                <BugChallenge
                  key={selectedChallenge.id}
                  title={selectedChallenge.title}
                  description={selectedChallenge.description}
                  buggyCode={selectedChallenge.buggyCode}
                  bugLine={selectedChallenge.bugLine}
                  bugDescription={selectedChallenge.bugDescription}
                  hint={selectedChallenge.hint}
                  fixedCode={selectedChallenge.fixedCode}
                  errorType={selectedChallenge.errorType}
                  errorExplanation={selectedChallenge.errorExplanation}
                  onComplete={handleChallengeComplete}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default LessonNavigation;
