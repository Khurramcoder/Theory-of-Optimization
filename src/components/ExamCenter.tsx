import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { CHAPTER_QUIZZES, CHAPTERS_META } from '../data/chaptersData';
import { MathView } from './MathView';
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, Sparkles, BookOpen, ShieldCheck, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExamCenter: React.FC = () => {
  // Aggregate all questions across chapters
  const allQuestions: QuizQuestion[] = Object.values(CHAPTER_QUIZZES).flat();

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes

  const filteredQuestions = allQuestions.filter((q) => 
    selectedDifficulty === 'All' ? true : q.difficulty === selectedDifficulty
  );

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !isCompleted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && examStarted && !isCompleted) {
      handleFinishExam();
    }
    return () => clearInterval(timer);
  }, [examStarted, isCompleted, timeLeft]);

  const handleStartExam = () => {
    setExamStarted(true);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setTimeLeft(filteredQuestions.length * 60); // 60s per question
  };

  const handleSelectAnswer = (qId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleFinishExam = () => {
    setIsCompleted(true);
    const score = calculateScore();
    const percent = (score / filteredQuestions.length) * 100;
    if (percent >= 75) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
    }
  };

  const calculateScore = () => {
    let score = 0;
    filteredQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === String(q.correctAnswer)) {
        score++;
      }
    });
    return score;
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const score = calculateScore();
  const percentage = filteredQuestions.length > 0 ? Math.round((score / filteredQuestions.length) * 100) : 0;
  const currentQ = filteredQuestions[currentQIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Award size={14} /> University Examination & Certification Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Mathematical Optimization Examination Center
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Evaluate your comprehensive mastery of optimization theory, convexity criteria, KKT conditions, and numerical search algorithms.
            </p>
          </div>

          {!examStarted && (
            <div className="flex items-center gap-3">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-slate-900 text-cyan-300 font-semibold px-3.5 py-2 rounded-xl border border-cyan-500/30 text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="All">All Difficulty Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="University Exam">University Exam Level</option>
              </select>

              <button
                onClick={handleStartExam}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-cyan-500/20"
              >
                Begin Timed Exam
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active Exam Session */}
      {examStarted && !isCompleted && currentQ && (
        <div className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-800 space-y-6">
          {/* Progress & Timer Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
            <div className="font-bold text-slate-300">
              Question {currentQIndex + 1} of {filteredQuestions.length}
            </div>

            <div className="flex items-center gap-2 font-mono text-cyan-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              <Clock size={14} className="text-cyan-400" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question Body */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold">
                {currentQ.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                {currentQ.type}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
              {currentQ.question}
            </h3>

            {currentQ.latex && (
              <MathView math={currentQ.latex} block />
            )}

            {/* Multiple Choice Options */}
            {currentQ.options && (
              <div className="space-y-2.5 pt-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === opt;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(currentQ.id, opt)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-300 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="px-4 py-2 bg-slate-900 text-slate-300 rounded-lg text-xs disabled:opacity-40"
            >
              Previous
            </button>

            {currentQIndex < filteredQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex((prev) => prev + 1)}
                className="px-5 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-cyan-400"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleFinishExam}
                className="px-6 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
              >
                Submit & Calculate Final Grade
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completed Results & Graduation Certificate */}
      {isCompleted && (
        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mx-auto text-cyan-300">
              <Award size={32} />
            </div>

            <h3 className="text-2xl font-bold text-slate-100">
              Examination Complete!
            </h3>

            <div className="text-4xl font-extrabold text-cyan-400 font-mono">
              {score} / {filteredQuestions.length} ({percentage}%)
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              {percentage >= 80 
                ? 'Outstanding Mastery! You demonstrated exceptional understanding of university-level Optimization Theory.' 
                : 'Good attempt! Review the chapter derivations and formula sheets to master difficult proof concepts.'}
            </p>

            {/* University Certificate Box */}
            {percentage >= 75 && (
              <div className="mt-6 p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-400/60 shadow-2xl max-w-xl mx-auto text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between border-b border-amber-400/30 pb-3 mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                    Academic Certificate of Excellence
                  </span>
                  <ShieldCheck size={20} className="text-amber-400" />
                </div>
                <h4 className="text-lg font-bold text-slate-100 font-display">
                  Optimization Techniques Visual Explorer
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  This certifies successful completion and demonstrated mastery in <strong className="text-slate-200">Nonlinear Programming, Convex Analysis, Hessian Curvature, Direct Search & KKT Conditions</strong>.
                </p>
                <div className="mt-6 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>Grade: <strong className="text-emerald-400">High Honors ({percentage}%)</strong></span>
                  <span>Issued by Google AI Studio Platform</span>
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleStartExam}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold inline-flex items-center gap-2"
              >
                <RotateCcw size={14} />
                <span>Retake Examination</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
