import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../context/useQuiz';
import { fetchQuestions } from '../services/infrastructure/triviaApi';

export default function Home() {
    const difficultyRef = useRef();
    const typeRef = useRef();
    const { state, startQuiz, setQuestions, setError } = useQuiz();

    async function handleStartQuiz() {
        startQuiz();
        const questions = await fetchQuestions(difficultyRef.current.value, typeRef.current.value);
        if (questions.error) {
            setError(questions.message);
            return;
        }
        setQuestions(questions);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-200">
            <div className="w-full max-w-xl px-8 py-12 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-lg shadow-black/30">

                <h1 className="text-4xl text-center font-semibold tracking-tight mb-4 text-zinc-100">
                    Quiz Game
                </h1>

                <p className="text-zinc-400 mb-10 leading-relaxed text-center">
                    Test your knowledge.
                    Answer a series of questions and find out your final score.
                </p>

                <div className="flex flex-col gap-6">

                    <div>
                        <p>Select Difficulty</p>

                        <select
                            ref={difficultyRef}
                            className="px-4 py-3 w-full rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 focus:outline-none  focus:ring-2 focus:ring-zinc-600 transition">
                            <option value={'easy'}>Easy</option>
                            <option value={'medium'}>Medium</option>
                            <option value={'hard'}>Hard</option>
                        </select>
                    </div>

                    <div>
                        <p>Select Type Quiz</p>

                        <select
                            ref={typeRef}
                            className="px-4 py-3 w-full rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 focus:outline-none  focus:ring-2 focus:ring-zinc-600 transition">
                            <option value={'multiple'}>Multiple</option>
                            <option value={'boolean'}>True / False</option>
                        </select>
                    </div>

                    <Link
                        to={'/quiz'}
                        onClick={handleStartQuiz}
                        className="text-center px-6 py-3 rounded-xl  bg-zinc-200 text-zinc-900 font-medium hover:bg-zinc-300 transition-colors duration-200">
                        Start Quiz
                    </Link>
                    {state.status === 'error' && (
                        <div className="flex items-center gap-3 mt-2 px-4 py-3 rounded-xl 
                    bg-red-500/10 border border-red-500/30 
                    text-red-400 text-sm">
                            <p>{state.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}