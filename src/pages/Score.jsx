import { Link, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/useQuiz";
import { useEffect } from 'react';

export default function Score() {
    const { state, resetQuiz } = useQuiz();
    const navigate = useNavigate();
    const totalQuestions = state.questions.length;

    const percentage = Math.round((state.score / totalQuestions) * 100);

    let message = "You can do better than that!";
    if (percentage >= 80) message = "Great work";
    else if (percentage >= 50) message = "Good result";

    useEffect(() => {
        if (state.status === 'idle') {
            navigate('/');
        }
    }, [state.status]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-200 px-6">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center shadow-lg shadow-black/30">

                <h1 className="text-3xl font-semibold mb-6 tracking-tight">
                    Quiz completed
                </h1>

                <div className="mb-6">
                    <p className="text-5xl font-bold text-zinc-100">
                        {state.score} / {totalQuestions}
                    </p>
                    <p className="text-zinc-500 mt-2">
                        {percentage}% correct answers
                    </p>
                </div>

                <p className="text-zinc-400 mb-8">
                    {message}
                </p>

                <div className="flex flex-col gap-4">
                    <Link
                        to="/"
                        onClick={resetQuiz}
                        className="px-6 py-3 rounded-xl bg-zinc-200 text-zinc-900 font-medium hover:bg-zinc-300 transition"
                    >
                        Retry
                    </Link>
                </div>

            </div>
        </div>
    );
}
