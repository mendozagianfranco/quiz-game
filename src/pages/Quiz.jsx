import { useEffect, useState } from 'react';
import { useQuiz } from '../context/useQuiz';
import he from 'he';
import { Link, useNavigate } from 'react-router-dom';

const TIMER_SECONDS = 20;

export default function Quiz() {
    const { state, resetQuiz, answerQuestion, nextQuestion } = useQuiz();
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);

    let currentQuestion = state.questions ? state.questions[state.currentIndex] : null;

    useEffect(() => {
        if (showResult) return;

        let timer = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [state.currentIndex, showResult]);

    useEffect(() => {
        if (secondsLeft === 0 && !showResult) {
            handleResponse(null);
        }
    }, [secondsLeft]);

    useEffect(() => {
        if (state.status === 'idle') {
            navigate('/');
        }
    }, [state.status]);

    useEffect(() => {
        let timeShowAnswer;
        if (showResult) {
            const isLast = state.currentIndex + 1 >= state.questions.length;

            timeShowAnswer = setTimeout(() => {
                if (!isLast) {
                    setSelectedAnswer(null);
                    setShowResult(false);
                    setSecondsLeft(TIMER_SECONDS);
                    nextQuestion();
                } else {
                    navigate('/score');
                }
            }, 1500);
        }

        return () => {
            clearTimeout(timeShowAnswer);
        };
    }, [showResult]);

    function handleResponse(answer) {
        if (showResult) return;

        const isCorrect = answer === currentQuestion.correctAnswer;

        answerQuestion(isCorrect);

        setSelectedAnswer(answer);
        setShowResult(true);
    }

    if (state.status === 'loading' || !currentQuestion) {
        return (
            <div className="flex justify-center items-center h-screen bg-zinc-950 text-zinc-400 text-lg">
                Loading questions...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-950 text-zinc-200 px-6">

            <div className="w-full max-w-xl bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-lg shadow-black/30">

                <div className="mb-10 flex flex-col gap-4   ">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm uppercase tracking-wider text-zinc-500">
                            Question {state.currentIndex + 1} of {state.questions.length}
                        </h2>
                        <div className="flex flex-col items-center">
                            <span className="text-xs uppercase tracking-wider text-zinc-400 mb-1">
                                Timer
                            </span>
                            <p
                                className={`text-lg font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-500 ${secondsLeft < 5 ? 'bg-red-700 animate-pulse' : 'bg-green-700'
                                    }`}
                            >
                                {secondsLeft}s
                            </p>
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed text-zinc-100">
                        {he.decode(currentQuestion.question)}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {currentQuestion.answers.map((answer, i) => {
                        const isCorrect = answer === currentQuestion.correctAnswer;
                        const isWrong = selectedAnswer === answer && !isCorrect;

                        let stateClass = "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700";

                        if (showResult) {
                            if (isCorrect) {
                                stateClass = "bg-zinc-700 border border-emerald-500 text-emerald-400";
                            }
                            else if (isWrong)
                                stateClass = "bg-zinc-700 border border-rose-500 text-rose-400";
                            else
                                stateClass = "bg-zinc-800 border border-zinc-700 opacity-60";
                        }

                        return (
                            <button
                                key={i}
                                className={`w-full p-4 rounded-xl transition-all duration-200 text-left cursor-pointer ${stateClass}`}
                                onClick={() => handleResponse(answer)}
                                disabled={showResult}
                            >
                                {he.decode(answer)}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Link
                to={'/'}
                onClick={resetQuiz}
                className="mt-8 text-sm text-zinc-500 hover:text-zinc-300 transition">
                Leave the quiz
            </Link>

        </div>
    );
}
