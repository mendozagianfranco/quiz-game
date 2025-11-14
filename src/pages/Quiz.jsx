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
            <div className='flex justify-center items-center h-screen bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white text-xl'>
                Caricamento domande...
            </div>
        );
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center text-white text-center bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800  h-screen '>
                <div className='w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
                    <div className='mb-25'>
                        <h2 className='text-2xl font-semibold mb-6'>Domanda {currentIndex + 1} di 10</h2>
                        <p className='text-lg text-gray-100 mb-8'>{he.decode(question.question)}</p>
                    </div>
                    <div className='flex flex-col gap-4 max-w-md'>
                        {shuffledAnswers.map((answer, i) => {
                            const isCorrect = answer === question.correct_answer;
                            const isWrong = selectedAnswer === answer && answer !== question.correct_answer;

                            let colorClass = '';

                            if (showResult) {
                                if (isCorrect) colorClass = 'bg-green-500 text-white';
                                else if (isWrong) colorClass = 'bg-red-500 text-white';
                            }

                            return (
                                <button
                                    key={i}
                                    className={`w-full p-4 rounded-xl border-2 border-blue-500 transition cursor-pointer ${colorClass}`}
                                    onClick={() => handleResponse(answer)}
                                    disabled={showResult}
                                >
                                    {he.decode(answer)}
                                </button>
                            );
                        }
                        )}
                    </div>
                </div>
                <Link to={'/'} className='mt-6 text-red-500 font-semibold hover:text-white hover:bg-red-500 px-4 py-2 rounded-lg transition cursor-pointer'>
                    Abbandona il quiz
                </Link>
            </div>
        </>
    );
}
