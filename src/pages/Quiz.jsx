import { useEffect, useState } from 'react';
import { useQuizContext } from '../context/useQuizContext';
import he from 'he';

export default function Quiz() {
    const { difficulty } = useQuizContext();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`)
            .then(res => res.json())
            .then(data => {
                if (data.results) setQuestions(data.results);
            });
    }, [difficulty]);


    function handleResponse(answer) {
        if (question.correct_answer === answer) {
            console.log('corretto');
        } else {
            console.log('sbagliato');
        }
        setCurrentIndex(prev => prev + 1);
    }

    const question = questions[currentIndex];

    if (!question) {
        return (
            <div className='flex justify-center items-center h-screen text-white text-xl'>
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
                        {question.incorrect_answers.concat(question.correct_answer)
                            .sort(() => Math.random() - 0.5)
                            .map((answer, i) => (
                                <button key={i} className='w-full p-4 rounded-xl border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700 transition cursor-pointer' onClick={() => handleResponse(answer)}>
                                    {he.decode(answer)}
                                </button>
                            ))}
                    </div>
                </div>
                <button className='mt-6 text-red-500 font-semibold hover:text-white hover:bg-red-500 px-4 py-2 rounded-lg transition cursor-pointer'>
                    Abbandona il quiz
                </button>
            </div>
        </>
    );
}