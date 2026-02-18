import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuizContext } from '../context/useQuizContext';

export default function Home() {
    const difficultyRef = useRef();
    const { setDifficulty, startQuiz } = useQuizContext();

    function handleStartQuiz() {
        setDifficulty(difficultyRef.current.value);
        startQuiz();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-200">
            <div className="w-full max-w-xl px-8 py-12 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-lg shadow-black/30">

                <h1 className="text-4xl text-center font-semibold tracking-tight mb-4 text-zinc-100">
                    Quiz Game
                </h1>

                <p className="text-zinc-400 mb-10 leading-relaxed text-center">
                    Metti alla prova le tue conoscenze.
                    Rispondi a una serie di domande e scopri il tuo punteggio finale.
                </p>

                <div className="flex flex-col gap-6">

                    <select
                        ref={difficultyRef}
                        className="px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 focus:outline-none  focus:ring-2 focus:ring-zinc-600 transition">
                        <option value={'easy'}>Facile</option>
                        <option value={'medium'}>Medio</option>
                        <option value={'hard'}>Difficile</option>
                    </select>

                    <Link
                        to={'/quiz'}
                        onClick={handleStartQuiz}
                        className="text-center px-6 py-3 rounded-xl  bg-zinc-200 text-zinc-900 font-medium hover:bg-zinc-300 transition-colors duration-200">
                        Inizia il Quiz
                    </Link>

                </div>
            </div>
        </div>
    );
}