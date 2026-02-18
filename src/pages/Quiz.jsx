import { useEffect, useState } from 'react';
import { useQuizContext } from '../context/useQuizContext';
import he from 'he';
import { Link } from 'react-router-dom';

export default function Quiz() {
    const { difficulty } = useQuizContext();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const question = questions[currentIndex];

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`)
            .then(res => res.json())
            .then(data => {
                if (data.results) setQuestions(data.results);
            });
    }, [difficulty]);

    useEffect(() => {
        if (question) {
            const answers = [...question.incorrect_answers, question.correct_answer];
            setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
        }
    }, [question]);

    function handleResponse(answer) {
        setSelectedAnswer(answer);
        setShowResult(true);
        setTimeout(() => {
            setShowResult(false);
            setSelectedAnswer(null);
            setCurrentIndex(prev => prev + 1);
        }, 1500);
    }

    if (!question) {
        return (
            <div className="flex justify-center items-center h-screen bg-zinc-950 text-zinc-400 text-lg">
                Caricamento domande...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-950 text-zinc-200 px-6">

            <div className="w-full max-w-xl bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-lg shadow-black/30">

                <div className="mb-10">
                    <h2 className="text-sm uppercase tracking-wider text-zinc-500 mb-3">
                        Domanda {currentIndex + 1} di 10
                    </h2>

                    <p className="text-lg leading-relaxed text-zinc-100">
                        {he.decode(question.question)}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {shuffledAnswers.map((answer, i) => {
                        const isCorrect = answer === question.correct_answer;
                        const isWrong = selectedAnswer === answer && !isCorrect;

                        let stateClass = "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700";

                        if (showResult) {
                            if (isCorrect)
                                stateClass = "bg-zinc-700 border border-emerald-500 text-emerald-400";
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
                className="mt-8 text-sm text-zinc-500 hover:text-zinc-300 transition">
                Abbandona il quiz
            </Link>

        </div>
    );
}
